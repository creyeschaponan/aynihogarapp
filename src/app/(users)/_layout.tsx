import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider'; 


const UsersLayout = () => {
  const { profile } = useAuth(); //

  return (
    <Stack  
      screenOptions={{
        headerShown: false,
      }} />
  );
};

export default UsersLayout;
