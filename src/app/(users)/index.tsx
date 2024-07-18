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
import { Database, Tables, Enums } from "../../types/supabase";

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
import PrimaryButton from "../../components/PrimaryButton";

Keyboard.dismiss();

type evidenceData = {
  id: string;
  name: string;
  image: string;
};

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

// type services_request = Tables<"services_requests">;

export default function Index() {
  const { session } = useAuth();
  const navigation = useNavigation();
  const [latitud, setLatitud] = useState<number>(0);
  const [longitud, setLongitud] = useState<number>(0);
  const [direction, setDirection] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedOccupationId, setSelectedOccupationId] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [listEvidences, setListEvidences] = useState<evidenceData[]>([]);
  const { data: occupations, error, isLoading } = useOccupations();
  const [offertsTechnical, setOffertsTechnical] = useState(false);
  const [listOcupationSupabase, setListOcupationSupabase] = useState<
    occupationData[]
  >([]);
  const [servicesId, setServicesId] = useState("");

  const snapPointsModalOne = useMemo(() => ["15%", "48%"], []);
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
        const _locationData = await getCurrentLocation();
        const geoCodeData = await getGeolocation(_locationData);
        const directionConst = `${geoCodeData[0].name}, (${geoCodeData[0].district})`;
        setDirection(directionConst);
        console.log(_locationData);
        setLatitud(_locationData.coords.latitude);
        setLongitud(_locationData.coords.longitude);
        console.log(latitud, longitud);
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

  useEffect(() => {
    if (offertsTechnical) {
      const channel = supabase
        .channel("offerts_technical")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "services_offerts",
            filter: `services_id=eq.${servicesId}`,
          },
          (payload) => {
            console.log(payload.new);
            const services_request = payload.new as Tables<"services_requests">;
            if (services_request.id === servicesId) {
              Alert.alert("Offerts", services_request.detail);
            }
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [offertsTechnical, servicesId]);

  const renderOccupation = ({ item }: { item: occupationData }) => {
    let isSelected = selectedOccupationId === item.id;

    return (
      <Occupations
        item={item}
        onPress={() => setSelectedOccupationId(item.id)}
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

  const searchAynis = async () => {
    try {
      setLoading(true);
      const newService = await insertServiceRequest();
      if (newService.error) throw newService.error;
      console.log("NEW SERVICE", newService);
      // setListEvidences([]);
      setOffertsTechnical(true);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error Insert Service", error.message);
      } else {
        console.log(error);
        Alert.alert("Unknown Error", "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const insertServiceRequest = async () => {
    const body = {
      location_lat: latitud,
      location_lon: longitud,
      profile_user_id: session?.user?.id,
      detail_text: description,
      occupation_id: selectedOccupationId,
    };
    console.log(body);

    try {
      // Inserta el services_request
      const { data, error: requestError } = await supabase.rpc(
        "insert_services_request",
        body
      );
      if (requestError) throw requestError;
      const serviceId = data;

      // Intenta insertar las evidencias
      const evidencesErrors = await insertEvidences(serviceId);

      // Si hay errores al insertar las evidencias, elimina el services_request
      if (evidencesErrors.length > 0) {
        await supabase.from("services_request").delete().eq("id", serviceId);
        throw new Error("Failed to insert evidences");
      }

      // Si todo va bien, actualiza el estado
      setServicesId(serviceId);
      console.log("NEW SERVICE ID", serviceId);
      return { data: serviceId, error: null };
    } catch (error) {
      console.error("Transaction error:", error);
      return { data: null, error };
    }
  };

  const insertEvidences = async (serviceId: any) => {
    let errors: string[] = [];
    for (const evidence of listEvidences) {
      try {
        console.log(serviceId, evidence.image);
        const uploadImage = await uploadSupabaseImages(serviceId, evidence);
        console.log("URL IMAGE FOR LIST EVIDENCES", uploadImage);
        const { error } = await supabase.rpc("insert_service_evidence", {
          url_image_text: uploadImage,
          service_id_bigint: serviceId,
        });
        console.log("ERROR LIST EVIDENCES", error);
        if (error) {
          errors.push(error.details);
        }
      } catch (error) {
        errors.push(error.message);
      }
    }
    return errors;
  };

  const uploadSupabaseImages = async (serviceId: any, image: any) => {
    try {
      if (!image.image) {
        throw new Error("No image uri!"); // Esto no debería suceder, pero por si acaso...
      }

      const arraybuffer = await fetch(image.image).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.image.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${serviceId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("evidences")
        .upload(path, arraybuffer, {
          contentType: "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      console.log(`Uploaded image to path: ${data.path}`);

      const url = await createUrl(data.path);
      console.log("URL DENTRO DE UPLOAD SUPABASE IMAGES", url);
      if (url?.errorUrl) throw url?.errorUrl;

      return url?.url;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Upload Image Error", error.message);
        throw error;
      } else {
        console.log(error);
        throw error;
      }
    }
  };

  const createUrl = async (path: string) => {
    try {
      if (!path) {
        throw new Error("No path!"); // Esto no debería suceder, pero por si acaso...
      }
      console.log(path);
      const { data, error } = await supabase.storage
        .from("evidences")
        .createSignedUrl(path, 3600 * 24 * 7);
      console.log("URL DE SUPABASE", data?.signedUrl);
      const url = data?.signedUrl;
      console.log("URL", url);
      const errorUrl = error;
      return { url, errorUrl };
    } catch (error) {
      console.log("error dentro de create url", error);
      if (error instanceof Error) {
        Alert.alert("Create Url Error", error.message);
      } else {
        console.log(error);
        throw error;
      }
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
          <View className="bg-primary flex w-full pl-5 pb-2">
            <Text className="text-terciary text-left text-secondary font-bold text-xl">
              Seleccione su problema :
            </Text>
          </View>
          <View className="bg-primary flex-row justify-around pb-4 pt-1 border-y border-primary">
            <FlatList
              horizontal
              data={listOcupationSupabase}
              renderItem={renderOccupation}
              keyExtractor={(item) => item.id}
              extraData={selectedOccupationId}
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
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flex: 1,
                      marginLeft: 5,
                      justifyContent: "space-around",
                    }}
                  />
                </View>
              </View>
              <PrimaryButton
                text="Buscar Ayni's"
                loading={loading}
                validated={true}
                onPress={() => searchAynis()}
              />
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
