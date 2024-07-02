import {useState,useRef} from 'react';
import { useColorScheme, View, StyleSheet, Image,PanResponder, PanResponderGestureState } from 'react-native';
import { Redirect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Color } from '../../constants/theme';
import { useAuth } from '../../providers/AuthProvider';
import Text from '../../components/Text';
import { useOccupations } from '../../api/occupations';
import BottomSheetComponent, { BottomSheetComponentRef }  from '../../components/BottomSheetComponent';
import Map from '../../components/Map';
import Ubication from '../../components/Ubication';

export default function Index() {
  const { data: occupations, error, isLoading } = useOccupations();
  const { session, profile } = useAuth();

  const bottomSheetRef = useRef<BottomSheetComponentRef>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        bottomSheetRef.current?.collapseSheet();
      },
      onPanResponderRelease: () => {
        bottomSheetRef.current?.expandSheet();
      },
      onPanResponderTerminate: () => {
        bottomSheetRef.current?.expandSheet(); // Handle case if gesture is terminated abruptly
      },
    })
  ).current;

  if (!session) {
    return <Redirect href='/' />;
  }

  return (
    <View className='flex-1'>
       <View className='flex-1' >
          <Ubication />
          <Map />
       </View>
       {/* <BottomSheetComponent 
           ref={bottomSheetRef}
           snapPoints={["10%", "45%"]}
           onChange={(index) => console.log(`BottomSheet changed to index ${index}`)}
         >
           <Text>Hello World!</Text>
           <Text>Another piece of content</Text>
        </BottomSheetComponent> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondary,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 700 / 2.4,
    height: 700 / 2.4,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  gestureContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
