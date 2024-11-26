import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = (props: any) => {
  return (
    <Text {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter', // Define la fuente global aquí
  },
});

export default CustomText;
