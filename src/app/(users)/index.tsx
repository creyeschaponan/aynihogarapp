import {useState,useRef, useEffect} from 'react';
import { View, Pressable,TouchableOpacity, Image,TextInput,ScrollView } from 'react-native';
import { Redirect, useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



import { useAuth } from '../../providers/AuthProvider';
import Text from '../../components/Text';
import { useOccupations } from '../../api/occupations';
import BottomSheetComponent, { BottomSheetComponentRef }  from '../../components/BottomSheetComponent';
import Map from '../../components/Map';
import Input from '../../components/Input';
import { supabase } from '../../lib/supabase';
import { FlatList } from 'react-native-gesture-handler';
import { getCurrentLocation, getGeolocation } from '../../hooks/useLocation';

import { occupationData, Occupations } from '../../components/Occupation';
import PrimaryButton from '../../components/PrimaryButton';


const DATA: occupationData[] = [
  { id: '1', name: 'Electricidad', image: require('../../../assets/icons/Light_white.png') },
  { id: '2', name: 'Gasfitería', image: require('../../../assets/icons/Plumbing_white.png') },
  { id: '3', name: 'Albañilería', image: require('../../../assets/icons/Hammer_white.png') },
  { id: '4', name: 'Carpinteria', image: require('../../../assets/icons/Trowel_white.png') },
  { id: '5', name: 'Otros', image: require('../../../assets/icons/Trowel_white.png') },
];


export default function Index() {
  // const { data: occupations, error, isLoading } = useOccupations();
  const { session } = useAuth();
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState('');

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

  return (
    <View className='flex-1'>
       <View className='flex-1' >
          <Map />
       </View>
      <BottomSheetComponent 
          ref={bottomSheetRef}
          snapPoints={["15%", "45%"]}          
        >
          <View className='bg-primary flex-row justify-around pb-4'>
            <FlatList
                horizontal
                data={DATA}
                renderItem={renderOccupation}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginLeft: 5, marginRight: 15}}
              />
          </View>
          <ScrollView  className="flex-1 p-4 w-full">
              <Text className='text-lg font-bold mb-2'>¿Qué necesitas arreglar?</Text>
              <TextInput
                className='border  w-full'
                placeholder='Describe tu problema'
                value={description}
                onChangeText={setDescription}
              />
              
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
    </View>
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