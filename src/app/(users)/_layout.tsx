import React from 'react';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import DrawerContent from '../../components/DrawerContent';

const UsersLayout = () => {
  return (
    <Drawer
        screenOptions={{
            drawerLabelStyle: {
                marginLeft: -20
            },
            drawerActiveTintColor: '#F28627',
            drawerInactiveTintColor: '#888888',
            headerTintColor: '#F28627',
            drawerIcon: ({size, color})=>(
                <Ionicons name="menu-outline"  size={size} color={color} />
            ),
            headerShown: false,
            
        }}
        drawerContent={DrawerContent}
        
    >
        <Drawer.Screen
            name="index"
            options={{
                drawerLabel: 'Inicio',
                title: '',
                drawerIcon: ({size, color})=>(
                    <Ionicons name="home-outline"  size={size} color={color} />
                )
            }}
        />
        <Drawer.Screen
            name="verification"
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="orders"
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="profile"
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        <Drawer.Screen
            name="settings"
            options={{
              drawerItemStyle: { display: 'none' }
            }}
        />
        
    </Drawer>
  );
};

export default UsersLayout;
