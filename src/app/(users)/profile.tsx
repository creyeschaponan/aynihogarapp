import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import PrimaryButton from '../../components/PrimaryButton';
import Input from '../../components/Input';
import { useAuth } from '../../providers/AuthProvider';
import { Image, View, Text } from 'react-native-animatable';

const Profile = (props: any) => {
  const { session } = useAuth();
  const [isProviderPhone, setIsProviderPhone] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    if(session.user.identities[0].provider === 'phone'){
      setIsProviderPhone(true);
    }
  }, [session]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center bg-backgroundLight px-6 m-0">
          <Text className="text-primary text-center text-2xl font-bold mb-8">
            Confirma tu información
          </Text>
          <View className="items-center mb-6">
            <View className="relative">
              <Icon name="person-circle-outline" size={100} color="#F28627" />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                <Icon name="add-circle-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="space-y-4">
            <Input text="Nombre" 
               
              value={name} 
              onChange={setName}
            />
            <Input text="Correo electrónico"
              
              value={email} 
              onChange={setEmail}
              keyboardType="email-address"
            />
            {
              isProviderPhone ? (
                <Input text="Celular"
                  
                  value={phone} 
                  onChange={setPhone}
                  keyboardType="phone-pad"
                />
              ) : null
            }
          </View>
          <View className="my-6 text-center">
            <PrimaryButton 
              text="Enviar código"
              loading={loading}
              validated={validated}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Profile;
