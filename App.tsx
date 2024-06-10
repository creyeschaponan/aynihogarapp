import { StyleSheet, View } from 'react-native';
import { useFonts } from "expo-font";
import  LoginScreen  from './src/screens/LoginScreen';
import theme from './src/theme';

export default function App() {

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={theme.container}>
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({

});
