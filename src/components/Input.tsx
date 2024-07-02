import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = (props : any) => {
  return (
    <TextInput
      mode='outlined'
      label={props.text}
      value={props.value}
      onChangeText={props.onChange}
      {...props}
      placeholderTextColor={'#888888'}
      textColor='#F28627'
      selectionColor='#F28627'
      outlineColor='#F28627'
      activeOutlineColor='#888888'
      outlineStyle={{
        borderWidth: 1,
        borderColor: '#F28627',
        borderRadius: 0,
        paddingHorizontal: 15,
        paddingVertical: 8,
        color: "#888888",
      }}
    />
  );
};

export default Input;