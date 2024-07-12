import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Pressable,
  Image,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { Redirect, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput, Button } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../../providers/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

import { supabase } from "../../lib/supabase";
import { getCurrentLocation, getGeolocation } from "../../hooks/useLocation";
import Text from "../../components/Text";
import BottomSheetComponent, {
  BottomSheetComponentRef,
} from "../../components/BottomSheetComponent";
import Map from "../../components/Map";
import { occupationData, Occupations } from "../../components/home/Occupation";
import TextInputDisabled from "../../components/home/TextInputDisabled";
import TextInputNormal from "../../components/home/TextInputNormal";
import {
  methodPaymentData,
  MethodPayment,
} from "../../components/home/MethodPayment";
import ButtonMenu from "../../components/home/ButtonMenu";

import { useOccupations } from "../../api/occupations";

Keyboard.dismiss();

type evidenceData = {
  id: string;
  name: string;
  image: string;
};

const listOccupations: occupationData[] = [
  {
    id: "1",
    name: "Electricidad",
    image: require("../../../assets/icons/Light_white.png"),
  },
  {
    id: "2",
    name: "Gasfitería",
    image: require("../../../assets/icons/Plumbing_white.png"),
  },
  {
    id: "3",
    name: "Albañilería",
    image: require("../../../assets/icons/Hammer_white.png"),
  },
  {
    id: "4",
    name: "Carpinteria",
    image: require("../../../assets/icons/Trowel_white.png"),
  },
  {
    id: "5",
    name: "Otros",
    image: require("../../../assets/icons/Trowel_white.png"),
  },
];

const paymentMethods: methodPaymentData[] = [
  { id: "1", name: "Yape", icon: require("../../../assets/icons/Yape.png") },
  {
    id: "2",
    name: "Plin",
    icon: require("../../../assets/icons/Plin.png"),
  },
  {
    id: "3",
    name: "Efectivo",
    icon: require("../../../assets/icons/Banknotes.png"),
  },
];

export default function Index() {
  const { session } = useAuth();
  const navigation = useNavigation();
  const [direction, setDirection] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [listEvidences, setListEvidences] = useState<evidenceData[]>([]);
  const { data: occupations, error, isLoading } = useOccupations();
  const [listOcupationSupabase, setListOcupationSupabase] = useState<
    occupationData[]
  >([]);

  const snapPointsModalOne = useMemo(() => ["15%", "45%"], []);
  const snapPointsModalTwo = useMemo(() => ["30%"], []);
  const bottomSheetRef = useRef<BottomSheetComponentRef>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior="none"
      />
    ),
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const locationData = await getCurrentLocation();
        const geoCodeData = await getGeolocation(locationData);
        const directionConst = `${geoCodeData[0].name}, (${geoCodeData[0].district})`;
        setDirection(directionConst);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (occupations) {
      setListOcupationSupabase(occupations);
    }
  }, [occupations]);

  const renderOccupation = ({ item }: { item: occupationData }) => {
    const isSelected = selectedId === item.id;
    return (
      <Occupations
        item={item}
        onPress={() => setSelectedId(item.id)}
        isSelected={isSelected}
      />
    );
  };

  const renderEvidence = ({ item }: { item: evidenceData }) => (
    <Image source={{ uri: item.image }} style={{ height: 40, width: 40 }} />
  );

  const renderMethodPaymet = ({ item }: any) => (
    <MethodPayment
      item={item}
      onPress={() => selectedMethodPayment(item)}
      selectedMethod={selectedMethod}
    />
  );

  const closedBottomModalSheet = () => {
    bottomSheetModalRef.current?.close();
  };

  const selectedMethodPayment = (item: any) => {
    setSelectedMethod(item.id);
    closedBottomModalSheet();
  };

  const uploadEvidence = async () => {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restringir solo a imágenes
        allowsMultipleSelection: true, // Permitir seleccionar múltiples imágenes
        quality: 1,
        exif: false, // No necesitamos esos datos
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
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
  };

  const uploadSupabaseImages = async () => {
    try {
      setUploading(true);

      for (const image of listEvidences) {
        if (!image.image) {
          throw new Error("No image uri!"); // Esto no debería suceder, pero por si acaso...
        }

        const arraybuffer = await fetch(image.image).then((res) =>
          res.arrayBuffer()
        );

        const fileExt = image.image.split(".").pop()?.toLowerCase() ?? "jpeg";
        const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from("evidences")
          .upload(path, arraybuffer, {
            contentType: "image/jpeg",
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
  };

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <Map />
        </View>
        <BottomSheetComponent
          ref={bottomSheetRef}
          snapPoints={snapPointsModalOne}
        >
          <View className="bg-primary flex-row justify-around pb-4 pt-1 border-y border-primary">
            <FlatList
              horizontal
              data={listOcupationSupabase}
              renderItem={renderOccupation}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginLeft: 5,
                marginRight: 15,
              }}
            />
          </View>
          <ScrollView className="flex-1 w-full px-6 ">
            <View className="flex-1 gap-4 justify-center pt-5">
              <TextInputDisabled
                placeholder="Cargando tu dirección..."
                value={direction}
                left={<TextInput.Icon icon="map" color="#F28627" />}
                style={{
                  height: 40,
                  backgroundColor: "#D8D8D8",
                }}
              />
              <View className="flex-row items-top pb-2 justify-start">
                <TextInputNormal
                  value={description}
                  onChangeText={setDescription}
                  style={{
                    height: 40,
                    fontSize: 14,
                    marginTop: 0,
                    paddingTop: 0,
                    justifyContent: "center",
                  }}
                />
                <Pressable
                  className="pl-2 pt-1.5"
                  onPress={handlePresentModalPress}
                >
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={paymentMethods[selectedMethod - 1]?.icon}
                  />
                </Pressable>
              </View>
              <View className="flex-row pb-2">
                <Button
                  mode="outlined"
                  icon="paperclip"
                  textColor="#888888"
                  style={{
                    height: 40,
                    borderRadius: 0,
                    borderWidth: 1,
                    borderColor: "#F28627",
                  }}
                  onPress={uploadEvidence}
                >
                  <Text className="text-terciary pl-2">
                    Adjunta tus evidencias
                  </Text>
                </Button>

                <View className="flex-1">
                  <FlatList
                    horizontal
                    data={listEvidences}
                    renderItem={renderEvidence}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flex: 1,
                      marginLeft: 5,
                      justifyContent: "space-around",
                    }}
                  />
                </View>
              </View>
              <Button
                className="bg-primary rounded-none"
                mode="contained"
                onPress={() => console.log("Pressed")}
              >
                Buscar Ayni's
              </Button>
            </View>
          </ScrollView>
        </BottomSheetComponent>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPointsModalTwo}
          detached={true}
          stackBehavior="push"
          enableDismissOnClose={true}
          enablePanDownToClose={false}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{
            display: "none",
          }}
          handleStyle={{ backgroundColor: "#F28627" }}
        >
          <View className="flex-1 items-left mb-2">
            <View className="bg-primary flex-row pb-4 pl-4 pr-2">
              <Text className="flex-1 text-terciary text-left text-secondary font-bold text-2xl">
                Métodos de pago
              </Text>
              <Pressable
                onPress={() => closedBottomModalSheet()}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#d9d9d9" : "white",
                  },
                  {
                    alignItems: "center",
                    justifyContent: "top",
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                  },
                ]}
              >
                <MaterialIcons name="close" size={24} color="#F28627" />
              </Pressable>
            </View>
            <BottomSheetFlatList
              data={paymentMethods}
              keyExtractor={(item) => item.id}
              renderItem={renderMethodPaymet}
              contentContainerStyle={{
                flex: 1,
                justifyContent: "space-around",
              }}
            />
          </View>
        </BottomSheetModal>
        <View className="absolute top-12 left-5 ">
          <ButtonMenu onPress={() => navigation.openDrawer()} />
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
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
