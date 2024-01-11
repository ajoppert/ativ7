import React from 'react';
import {  StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import EditProductScreen from './src/screens/EditProductScreen';
import AddProductScreen from './src/screens/AddProductScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
       <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='EditProduct' component={EditProductScreen} />          
          <Stack.Screen name='AddProduct' component={AddProductScreen} />          

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}