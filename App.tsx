// import 'react-native-url-polyfill/auto'
// import { StyleSheet, View, Text } from 'react-native';

// import { useState, useEffect } from 'react'
// import { supabase } from './src/lib/supabase'
// import Auth from './src/components/Auth'
// import { Session } from '@supabase/supabase-js'

// // import { useFonts } from "expo-font";
// // import  LoginScreen  from './src/screens/LoginScreen';
// // import theme from './src/theme';
// // import ConfirmationScreen from './src/screens/ConfirmationScreen';

// export default function App() {

//   // const [fontsLoaded, error] = useFonts({
//   //   "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
//   //   "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
//   //   "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
//   //   "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
//   //   "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
//   // });

//   // if (!fontsLoaded && !error) {
//   //   return null;
//   // }

//   const [session, setSession] = useState<Session | null>(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//     // <View style={theme.container}>
//     //   <LoginScreen/>
//     // </View>
//   return (
//     <View>
//       <Auth />
//       {session && session.user && <Text>{session.user.id}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({

// });


// import 'react-native-url-polyfill/auto'
// import { useState, useEffect } from 'react'
// import { supabase } from './src/lib/supabase'
// import Auth from './src/components/Auth'
// import { View, Text } from 'react-native'
// import { AuthError, Session } from '@supabase/supabase-js'
// import AuthGoogle from './src/components/AuthGoogle'
// import theme from './src/theme'

// export default function App() {
//   const [session, setSession] = useState<Session | null>(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <View style={theme.container}>
//       <Auth />
//       {/* <AuthGoogle /> */}
//       {session && session.user && <Text>{session.user.id}</Text>}
//     </View>
//   )
// }