import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import theme from '../constants/theme';

export default function PrimaryButton(props: any) {

    return (
        <Pressable 
        className="bg-secondary text-primary py-5 text-center px-24
        border border-primary min-w-full"
      
        android_ripple={{ color: '#dddddd'}}
        onPress={props.onPress} {...props}>
          {
          props.loading ? (
            <ActivityIndicator 
                color="#F28627"
                animating={props.loading}></ActivityIndicator>
          ) : (
            <Text style={[theme.buttonTextSecundary,props.textStyle]}>
              {props.text}
            </Text>
          )
        }
        </Pressable>
    )
}
