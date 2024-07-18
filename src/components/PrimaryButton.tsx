import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import theme from "../constants/theme";

export default function PrimaryButton(props: any) {
  const classNames = [];
  if (props.validated) {
    classNames.push("bg-primary py-5 text-center ");
  } else {
    classNames.push("bg-primaryDisabled py-5 text-center ");
  }
  return (
    <Pressable
      className={classNames.join(" ")}
      android_ripple={{ color: "#dddddd" }}
      {...props}
    >
      {props.loading ? (
        <ActivityIndicator
          color="#fff"
          animating={props.loading}
        ></ActivityIndicator>
      ) : (
        <Text className="text-secondary text-xl font-semibold text-center">
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
// bg-primary
