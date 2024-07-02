
import React, {useState} from 'react';
import {Alert, Animated, SafeAreaView, Text, View,StyleSheet} from 'react-native';
import {CodeField, Cursor,useBlurOnFulfill,useClearByFocusCell} from 'react-native-confirmation-code-field';
import {theme, Color} from '../../constants/theme'
import { supabase } from '../../lib/supabase';
import Loading from '../../components/auth/Loading';
import { useAuth } from '../../providers/AuthProvider';

const CELL_SIZE = 30;
const CELL_BORDER_RADIUS = 0;
const DEFAULT_CELL_BG_COLOR = Color.primary;
const NOT_EMPTY_CELL_BG_COLOR = Color.primary;
const ACTIVE_CELL_BG_COLOR = Color.secondary;
const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 6;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export default function CodeVerification () {
  // quiero agregar el user del useAuth 
  const [isLoadingPin, setIsLoadingPin] = useState(false)
  const { phone } = useAuth();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
          })
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const handleCodeChange = async (value: string) => {
    setValue(value)
    if (value.length === 6) {
      console.log(phone);
      console.log(value);
      setIsLoadingPin(true)
      setTimeout(async () => {
        const { error } = await supabase.auth.verifyOtp({
          phone: phone,
          token: value,
          type: 'sms'
        })   
        console.log(error)
        if (error) {
          Alert.alert(error.message); 
          setIsLoadingPin(false);
        }
        setIsLoadingPin(false);
      }, 1000)
    }
  }

  return (
    isLoadingPin ? <Loading /> : (
    <SafeAreaView className='flex-1 justify-center bg-backgroundLight px-6 m-0 '>
        <Text className="text-primary text-center text-2xl font-bold mb-5">
          Te enviaremos un {'\n'} código
        </Text>
        <Text className='text-terciary text-center text-xs'>
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
          renderCell={renderCell}
        />
    </SafeAreaView>)
  );
};

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    justifyContent: 'center',
  },

  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 3,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: Color.primary,
    backgroundColor: '#fff',

    // IOS
    shadowColor: Color.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

});



