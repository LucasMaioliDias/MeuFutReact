import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TelaSplash , TelaAbertura, TelaCadastro, TelaLogin, TelaMenu, TelaDetalhes, TelaMaps, TelaAgendamento, TelaPagamento,TelaConfirmacao } from './Telas';

const Stack = createNativeStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      TelaAbertura: undefined;
      TelaLogin: undefined;
      TelaCadastro: undefined;
      TelaMenu: undefined;
      TelaDetalhes: undefined;
      TelaMaps: undefined;
      TelaAgendamento: undefined;
      TelaPagamento :undefined;
      TelaConfirmacao: undefined;
    }
  }
}

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
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCadastro"
          component={TelaCadastro}
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
        <Stack.Screen
          name="TelaMaps"
          component={TelaMaps}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="TelaAgendamento"
          component={TelaAgendamento}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TelaPagamento"
          component={TelaPagamento}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TelaConfirmacao"
          component={TelaConfirmacao}
          options={{ headerShown: false }}
        />
       
       


      </Stack.Navigator>
    </NavigationContainer>
  );
}
