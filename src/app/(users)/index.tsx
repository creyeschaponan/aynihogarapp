import { Text, View } from 'react-native'
import { useAuth } from '../../providers/AuthProvider';
import { Redirect } from 'expo-router';

const Home = () => {
  const { isProfile } = useAuth();


  return (
    <View>
      <Text>Index</Text>
    </View>
  );
}

export default Home;