import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'react-native-animatable';
import { supabase } from '../lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DrawerContent(props:any) {

    const {bottom} = useSafeAreaInsets();
    const navigation = useNavigation();

    const closeDrawer = ()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        supabase.auth.signOut()
    }
  return (
    <View
        style={{flex: 1}}
    >
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View style={{padding: 20}}>
            <Image style={{height: 35}} resizeMode='contain' source={require('../../assets/icon.png')} />
            <Text className='text-primary text-2xl font-bold'>AyniHogar</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable onPress={closeDrawer} style={{padding: 20, paddingBottom: bottom+10}}>
        <Text><Ionicons name="log-out-outline" size={24} color="#F28627" /> Salir </Text>
      </Pressable>
    </View>
  )
}

{/* <Pressable
style={styles.buttonMenu}
onPress={() => supabase.auth.signOut()}
> */}