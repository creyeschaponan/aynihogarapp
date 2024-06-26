import { Pressable, useColorScheme, View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Link, Redirect, Tabs, router } from 'expo-router';
import { theme, Color, ColorText } from '../../constants/theme';
import { useAuth } from '../../providers/AuthProvider';
import { SimpleLineIcons } from '@expo/vector-icons';
import Text from '../../components/Text';
import { supabase } from '../../lib/supabase';
import CarrouselTech from '../../components/CarrouselTech';
import { useOccupations } from '../../api/occupations';
//https://icons.expo.fyi/

export default function Copy() {
  const { data: occupations, error, isLoading } = useOccupations();

  const colorScheme = useColorScheme();
  const { session } = useAuth();
  console.log(error)
  if (!session) {
    return <Redirect href={'/'} />;
  }

//   if (isLoading) {
//     return <ActivityIndicator />;
//   }

  return (
    <View style={[theme.container, styles.container]}>
      <View style={styles.header}>
        <Pressable
          style={styles.buttonMenu}
          onPress={() => supabase.auth.signOut()}
        >
          <SimpleLineIcons name="menu" size={24} color={Color.primary} />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenido, Cristian</Text>
        <Image source={require('../../../assets/images/job-hunt-bro.png')} style={styles.icon} />
        <View style={styles.carruselContainer}>
          <Text style={styles.subtitle}>¿Qué profesional deseas buscar?</Text>
          <Text style={styles.selectPrompt}>Selecciona el oficio que necesitas:</Text>
          
          
        </View>
      </View>
    </View>
  );
}

// {
//  error ? <Text style={{color:'red'}}>Failed to fetch products</Text> : <CarrouselTech offices={occupations} />
//}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondary,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  buttonMenu: {
    width: 40,
    height: 40,
    borderRadius: 0,
    borderColor: Color.primary,
    borderWidth: 1,
    backgroundColor: Color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: ColorText.primary,
  },
  icon: {
    width: 700 / 2.4,
    height: 700 / 2.4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorText.secondary,
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  selectPrompt: {
    fontSize: 14,
    color: ColorText.secondary,
  },
  carruselContainer: {
    flex: 1,
    backgroundColor: Color.primary,
    paddingVertical: 20,
    marginTop: 0,
    alignItems: 'center',
    alignSelf: 'stretch', // Ocupa todo el ancho del padre
  },
  
});
