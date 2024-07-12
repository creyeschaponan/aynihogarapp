import * as React from "react";
import { TextInput } from "react-native-paper";

const Input = (props: any) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      textColor="#F28627"
      left={props.left}
      mode="outlined"
      disabled
      contentStyle={{
        textAlign: "left",
      }}
      {...props}
    />
  );
};

export default Input;
