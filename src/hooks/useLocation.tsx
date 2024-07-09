import * as Location from 'expo-location';

async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const location = await Location.getCurrentPositionAsync({});
  return location;
}

async function getGeolocation(options: any) {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
  const location = await Location.reverseGeocodeAsync(options.coords);
  return location;
}

export { getCurrentLocation, getGeolocation };

