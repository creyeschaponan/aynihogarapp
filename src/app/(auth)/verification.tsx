import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { theme, Color } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import Loading from '../../components/auth/Loading';
import { useAuth } from '../../providers/AuthProvider';
import { router } from 'expo-router';

const CELL_COUNT = 6;

export default function CodeVerification() {
  const [isLoadingPin, setIsLoadingPin] = useState(false);
  const { phone } = useAuth();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleCodeChange = async (value: string) => {
    setValue(value);
    if (value.length === 6) {
      setIsLoadingPin(true);
      try {
        const { error } = await supabase.auth.verifyOtp({
          phone,
          token: value,
          type: 'sms'
        });
        if (error) {
          Alert.alert(error.message);
          setIsLoadingPin(false);
        } else {
          router.push("/(users)/confirmDataProfile");
        }
      } catch (error) {
        Alert.alert('Error verifying OTP');
        setIsLoadingPin(false);
      }
    }
  };

  return (
    isLoadingPin ? <Loading /> : (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={[theme.title, styles.title]}>
            Te enviaremos un {'\n'} código
          </Text>
          <Text style={[theme.text, styles.text]}>
            Por SMS recibirás un código el cual tendrás que {'\n'}
            ingresar a continuación:
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={handleCodeChange}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    gap: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    marginTop: 5,
    textAlign: "center",
  },
  codeFiledRoot: {
    height: 45,
    marginTop: 30,
    justifyContent: 'center',
  },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellText: {
    fontSize: 24,
  },
});
