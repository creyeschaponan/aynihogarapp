import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getCurrentLocation } from '../hooks/useLocation';

export default function Ubication() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      try {
        const locationData = await getCurrentLocation();
        setLocation(locationData);
      } catch (error) {
        setErrorMsg(error.message);
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <></>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});