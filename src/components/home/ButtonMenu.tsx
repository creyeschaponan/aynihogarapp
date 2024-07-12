import * as React from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";


const MenuButton = (props: any) => {
  return (
    <Pressable
      className="bg-secondary rounded-none p-3 flex items-center justify-center border-primary-100"
      onPress={props.onPress}
    >
      <MaterialIcons name="menu" size={24} color="#F28627" />
    </Pressable>
  );
};

export default MenuButton;
