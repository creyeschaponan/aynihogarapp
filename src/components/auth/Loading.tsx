import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat,
  } from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native'
// import { Image } from 'expo-image';
// import { useAssets, Asset } from 'expo-asset';
import theme, { Color } from '../../constants/theme';
import { router } from 'expo-router';

const duration = 1000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function Loading() {
    const sv = useSharedValue<number>(0);
    useEffect(() => {
        sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${sv.value * 360}deg` }],
    }));

    return (
    <View style={styles.container}>

        <Image source={require('../../../assets/images/mobile-inbox-bro.png')}  style={styles.icon} />
        <Animated.View style={[styles.box, animatedStyle]} />
        <Text style={theme.title}>
            Espera unos momentos...
        </Text>
        <Text style={theme.text}>
            Mientras configuramos tu cuenta
        </Text>
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
    icon: {
        width: 700 / 2.4,
        height: 700 / 2.4,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    box: {
        height: 50,
        width: 50,
        backgroundColor: Color.primary,
       
    },
  })
  