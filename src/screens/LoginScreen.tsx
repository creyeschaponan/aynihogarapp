import { useState } from "react"
import { StyleSheet, Text, View, Pressable, Linking  } from "react-native"
import { Formik } from "formik";
import PhoneInput, {
  ICountry,
} from 'react-native-international-phone-number';
import theme from '../constants/theme';
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default function LoginScreen() {
  const [selectedCountry, setSelectedCountry] =
    useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  const handlePressTerms = () => {
    Linking.openURL('https://www.example.com/terms'); // URL de Términos de Uso
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[theme.title,styles.title]}>
            Introduce tu número de Teléfono
        </Text>
        <Text style={[theme.text,styles.text]}>
            Te enviaremos un código para verificar tu número telefónico
        </Text>
      </View>
      <View style={styles.form}>
        <PhoneInput
          value={inputValue}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          language="es"
          placeholder="974327438"
          defaultCountry="PE"
          phoneInputStyles={theme.phoneInput}
          modalStyles={theme.phoneInputModal}
        />

        <PrimaryButton 
          text="Enviar código" 
          textStyle={theme.buttonText} 
          buttonStyle={styles.buttonPrimary} 
          onPress={() => {}}
        />

       <SecondaryButton 
          text="Google" 
          textStyle={theme.buttonTextSecundary} 
          buttonStyle={styles.buttonSecundary} 
          onPress={() => {}}
        />
      </View>

      <View style={styles.termUse}>
        <Text style={[theme.text,styles.textTermUse]}>
            Al unirte a nuestra aplicación aceptas nuestros 
            <Text style={theme.textAccent} onPress={handlePressTerms}> {' Términos de Uso '} </Text>
            y Pólitica de privacidad.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    gap: 10,
  },
  title:{
    textAlign: "center",
  },
  text: {
    marginTop: 5,
    textAlign: "center",
  },
  form: {
    marginTop: 50,
  },
  buttonPrimary: {
    marginTop: 20,
  },
  buttonSecundary: {
    marginTop: 20,
  },
  termUse:{
    marginTop: 10,
  },
  textTermUse:{
    textAlign: "center",
  },
  buttonTermUse:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  buttonTextTermUse:{
    textAlignVertical: 'bottom',
  }
})
