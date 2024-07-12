import * as React from "react";
import { TextInput } from "react-native-paper";

const Input = (props: any) => {
  return (
    <TextInput
      className="flex-1 text-terciary"
      mode="outlined"
      label="¿Qué necesitas arreglar?"
      value={props.value}
      onChangeText={props.onChange}
      placeholderTextColor={"#888888"}
      textColor="#F28627"
      selectionColor="#F28627"
      outlineColor="#F28627"
      activeOutlineColor="#888888"
      {...props}
    />
  );
};

export default Input;
