import React, { useState } from 'react';
import { View, TextInput, Text, Animated, StyleSheet } from 'react-native';
import { Easing } from 'react-native-reanimated';
import theme from '../constants/theme';

const Input = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || '');
  const [labelPosition] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleChangeText = (text: string) => {
    setValue(text);
    if (props.onChange) {
      props.onChange(text);
    }
  };

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 0],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {props.text}
      </Animated.Text>
      <TextInput
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        value={value}
        
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    left: 15,
    color: "#F28627",
    backgroundColor: 'white',
    paddingHorizontal: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#F28627",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: "#888888",
  },
});

export default Input;
