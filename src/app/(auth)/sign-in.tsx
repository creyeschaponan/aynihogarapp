import { useState, useRef } from "react"
import { Alert, Text, View, Linking,ScrollView,TouchableOpacity,Keyboard } from "react-native"
import { router } from "expo-router";

import { FontAwesome as FAIcon } from '@expo/vector-icons';
import PhoneInput, { ICountry, } from 'react-native-international-phone-number';
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin'
import RBSheet from 'react-native-raw-bottom-sheet';

import { supabase } from '../../lib/supabase'
import theme from '../../constants/theme';
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

import { useAuth } from "../../providers/AuthProvider";

const data = {
  "lists": [
    {
      "id": 1,
      "icon": "commenting-o",
      "label": "SMS"
    },
    {
      "id": 2,
      "icon": "whatsapp",
      "label": "WhatsApp"
    },
  ]
}

export default function LoginScreen() {
  GoogleSignin.configure({
    offlineAccess: true,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // El ID de cliente web
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID, // El ID de cliente iOS
  })

  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const { setPhone } = useAuth();
  const [ localPhone, setLocalPhone ] = useState('');
  const [ validatedPhone, setValidatedPhone ] = useState(false);
  const refScrollable = useRef();
  

  function handleInputValue(phoneNumber: string) {
    if(phoneNumber.length === 11){
      setValidatedPhone(true);
    }else{
      setValidatedPhone(false);
    }
    setLocalPhone(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  async function selectOTP() {
    console.log(validatedPhone,localPhone.length)
    if(!validatedPhone && localPhone.length < 11)  return;
    Keyboard.dismiss()
    refScrollable.current.open()
  }

  const sendOtp = async (id : number) =>{
    refScrollable.current.close()
    setLoading(true);
    const phoneTotal = selectedCountry?.callingCode + "" + localPhone.replace(/ /g, "")
    setPhone(phoneTotal);
    console.log(id)
    const {error} = await supabase.auth.signInWithOtp({
        phone: phoneTotal,
        options: {
            channel: id === 1 ? "sms" : "whatsapp"
        }
    })
    setLoading(false); 
    if (error) {
      console.log(error)
      Alert.alert(error.message)
    }
    router.push('/(auth)/verification')
  }

  const handlePressTerms = () => {
    Linking.openURL('https://www.example.com/terms'); // URL de Términos de Uso
  };

  const signInGoogle = async() => {
    try {
      setLoadingGoogle(true)
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(JSON.stringify(userInfo, null, 2))
      if (userInfo.idToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        })
        if (error) Alert.alert(error.message);
        setLoadingGoogle(false)
      } else {
        setLoadingGoogle(false)
        throw new Error('no ID token present!')
      }
    } catch (error: any) {
      setLoadingGoogle(false)
      console.log('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Operation in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        Alert.alert('An error occurred', error.message);
      }
    }
  };

  return (
    <View className="flex-1 flex flex-col justify-center items-center m-8 space-y-3 ">
      <Text className="text-center text-2xl text-primary font-extrabold">
        Introduce tu número de Teléfono
      </Text>
      <Text className="text-center text-sm text-terciary mb-12">
        Te enviaremos un código para verificar tu número telefónico
      </Text>
      <View className="mb-10">
        <PhoneInput
            value={localPhone}
            onChangePhoneNumber={handleInputValue}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            language="es"
            placeholder="974327438"
            defaultCountry="PE"
            phoneInputStyles={theme.phoneInput}
            modalStyles={theme.phoneInputModal}
        />
      </View>
      <View className="space-y-5">
        <PrimaryButton 
            text="Enviar código" 
            onPress={selectOTP}
            validated={validatedPhone}
            loading={loading}
          />
        <SecondaryButton 
            text="Google" 
            onPress={signInGoogle}
            loadingGoogle={loadingGoogle}
          />  
      </View>
      <View className="space-y-5">
        <Text className="text-center text-xs text-terciary mx-3">
          Al unirte a nuestra aplicación aceptas nuestros 
          <Text className="text-accent" onPress={handlePressTerms}> {' Términos de Uso '} </Text>
          y Póliticas de privacidad.
        </Text>
      </View>
      <RBSheet
        ref={refScrollable}
        draggable
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: "#fff",
          },
        }}>
        <ScrollView className="mx-3">
            <Text className="text-center text-2xl font-bold text-primary mx-3 mt-3 mb-6">
              ¿Cómo quieres recibir el código?
            </Text>
            <View className="mx-5">
              {data.lists.map(list => (
                <TouchableOpacity
                    className="flex-row gap-3 text-primary mb-5"
                    key={list.id}
                    onPress={() => sendOtp(list.id)}
                  >
                  <FAIcon size={25} color="#F28627" name={list.icon} />
                  <Text className="text-base text-primary font-semibold">{list.label}</Text>
                </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
      </RBSheet>
    </View>
  )
}
