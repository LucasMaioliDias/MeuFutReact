import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TelaSplash , TelaAbertura, TelaCadastro, TelaLogin, TelaMenu, TelaDetalhes } from './Telas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*
      <Stack.Screen
          name="TelaSplash"
          component={TelaSplash}
          options={{ headerShown: false }}
  />*/}
        <Stack.Screen
          name="TelaAbertura"
          component={TelaAbertura}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCadastro"
          component={TelaCadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaMenu"
          component={TelaMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaDetalhes"
          component={TelaDetalhes}
          options={{ headerShown: false }}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
