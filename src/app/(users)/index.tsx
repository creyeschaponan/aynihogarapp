import {useState,useRef, useEffect} from 'react';
import { Platform,View, Pressable, Image,ScrollView,Keyboard,Alert   } from 'react-native';
import Constants from 'expo-constants';
import { Redirect, useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput,Button,Icon } from 'react-native-paper';
import { useAuth } from '../../providers/AuthProvider';
import Text from '../../components/Text';
import BottomSheetComponent, { BottomSheetComponentRef }  from '../../components/BottomSheetComponent';
import Map from '../../components/Map';
import { FlatList } from 'react-native-gesture-handler';
import { getCurrentLocation, getGeolocation } from '../../hooks/useLocation';
import { occupationData, Occupations } from '../../components/Occupation';
import * as ImagePicker from 'expo-image-picker';

import PrimaryButton from '../../components/PrimaryButton';
import { supabase } from '../../lib/supabase';
import { useOccupations } from '../../api/occupations';

const listOccupations: occupationData[] = [
  { id: '1', name: 'Electricidad', image: require('../../../assets/icons/Light_white.png') },
  { id: '2', name: 'Gasfitería', image: require('../../../assets/icons/Plumbing_white.png') },
  { id: '3', name: 'Albañilería', image: require('../../../assets/icons/Hammer_white.png') },
  { id: '4', name: 'Carpinteria', image: require('../../../assets/icons/Trowel_white.png') },
  { id: '5', name: 'Otros', image: require('../../../assets/icons/Trowel_white.png') },
];

type evidenceData = {
  id: string;
  name: string;
  image: string;
}

// const listEvidences: evidenceData[] = [
//   { id: '1', name: 'Foto1', image: require('../../../assets/icons/Photos.png') },
//   { id: '2', name: 'Foto2', image: require('../../../assets/icons/Photos.png') },
//   { id: '3', name: 'Foto2', image: require('../../../assets/icons/Photos.png') },
// ];

export default function Index() {
  // const { data: occupations, error, isLoading } = useOccupations();
  const { session } = useAuth();
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [listEvidences, setListEvidences] = useState<evidenceData[]>([]);

  const bottomSheetRef = useRef<BottomSheetComponentRef>(null);
  const navigation = useNavigation();

  const [selectedId, setSelectedId] = useState<string>('1');
  const renderOccupation = ({item}: {item: occupationData}) => {
    const isSelected = selectedId === item.id;
    return <Occupations item={item} onPress={() => setSelectedId(item.id)} isSelected={isSelected} />;
  }

  if (!session) {
    return <Redirect href='/' />;
  }

  useEffect(() => {
    (async () => {
      try {
        const locationData = await getCurrentLocation();
        setLocation(locationData);

        const geoCodeData = await getGeolocation(locationData);
        const directionConst = `${geoCodeData[0].name}${geoCodeData[0].street == null ? '': ' ' + geoCodeData[0].street}, (${geoCodeData[0].district})`;
        setDirection(directionConst);

      } catch (error) {
        setErrorMsg(error.message);
      }
    })();
  }, []);


  async function uploadEvidence(){
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restringir solo a imágenes
        allowsMultipleSelection: true, // Permitir seleccionar múltiples imágenes
        quality: 1,
        exif: false, // No necesitamos esos datos
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.');
        return;
      }

      const selectedImages = result.assets.map((image) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(7)}`, // Generar un ID único
        name: `Foto${listEvidences.length + 1}`, // Asignar un nombre basado en la longitud actual del listado
        image: image.uri,
      }));

      setListEvidences((prevList) => [...prevList, ...selectedImages]);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  async function uploadSupabaseImages() {
    try {
      setUploading(true);

      for (const image of listEvidences) {
        if (!image.image) {
          throw new Error('No image uri!'); // Esto no debería suceder, pero por si acaso...
        }

        const arraybuffer = await fetch(image.image).then((res) => res.arrayBuffer());

        const fileExt = image.image.split('.').pop()?.toLowerCase() ?? 'jpeg';
        const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('evidences')
          .upload(path, arraybuffer, {
            contentType: 'image/jpeg',
          });

        if (uploadError) {
          throw uploadError;
        }

        console.log(`Uploaded image to path: ${data.path}`);
      }

      // Limpiar la lista de imágenes después de la carga
      setListEvidences([]);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  const renderEvidence = ({ item }: { item: evidenceData }) => (
    <Image source={{ uri: item.image }} style={{ height: 40, width: 40 }} />
  );

  return (
    <Pressable onPress={() => Keyboard.dismiss()}   className='flex-1' style={{ paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight + 10 }}>
       <View className='flex-1' >
          <Map />
       </View>
      <BottomSheetComponent 
          ref={bottomSheetRef}
          snapPoints={["15%","48%"]}         
        >
          <View className='bg-primary flex-row justify-around pb-4 pt-1 border-y border-primary' >
            <FlatList
                horizontal
                data={listOccupations}
                renderItem={renderOccupation}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginLeft: 5, marginRight: 15}}
              />
          </View>
          <ScrollView  className="flex-1 p-4 w-full gap-2">
              <TextInput
                placeholder='Cargando tu dirección...'
                value={direction}
                textColor='#F28627'
                left={<TextInput.Icon icon="map" color="#F28627" />}
                style={{ 
                  backgroundColor: '#D8D8D8', 
                  height:40, fontSize: 14, 
                  alignContent: 'center', justifyContent: 'center' }}
                mode='outlined'
                disabled
              />
              <View className='flex-1 flex-row items-top pb-2 justify-start'>
                <TextInput
                    className="flex-1 text-terciary"
                    mode='outlined'
                    label='¿Qué necesitas arreglar?'
                    value={description}
                    onChangeText={setDescription}
                    
                    placeholderTextColor={'#888888'}
                    textColor='#F28627'
                    selectionColor='#F28627'
                    outlineColor='#F28627'
                    activeOutlineColor='#888888'
                    style={{ height:40, fontSize: 14, marginTop: 0 , paddingTop: 0,justifyContent: 'center' }}
                  />
                  <Pressable className="pl-2 pt-1.5">
                    <Image style={{ height: 40, width: 40 }} source={require('../../../assets/icons/Yape.png')} />
                  </Pressable>
              </View>
              <View className='flex-row pb-2'>
                <Button mode="outlined" 
                  icon='paperclip'
                  textColor='#888888'
                  style={{ 
                      height: 40 , 
                      borderRadius: 0, 
                      borderWidth: 1, 
                      borderColor: '#F28627',
                    }}
                    onPress={uploadEvidence}>
                  <Text className="text-terciary pl-2">Adjunta tus evidencias</Text>
                </Button>
                
                <View className='flex-1'>
                  <FlatList 
                        horizontal
                        data={listEvidences}
                        renderItem={renderEvidence}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flex: 1, marginLeft: 5, justifyContent: 'space-around' }}
                    />
                </View>
              </View>

              <Button className='bg-primary rounded-none' mode="contained" onPress={() => console.log('Pressed')}>
                Buscar Ayni's
              </Button>
              
          </ScrollView >

      </BottomSheetComponent> 
      <View className="absolute top-12 left-5 "> 
          <Pressable
              className="bg-secondary rounded-none p-3 flex items-center justify-center border-primary-100"
              onPress={() => {
                navigation.openDrawer();
              }}
          >
            <MaterialIcons name="menu" size={24} color="#F28627" />
          </Pressable>
      </View>
    </Pressable >
  );
}

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("offerts_problems")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "services_requests",
  //         // filter: `sender_id=eq.${contactId}`,
  //       },
  //       (payload) => {
  //         console.log(payload.new);
  //         //const services_request = payload.new as ServicesRequest;
  //         // if (newMessage.receiver_id === user.id) {
  //         //   setMessages((prevMessages) => [newMessage, ...prevMessages]);
  //         // }
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, []);