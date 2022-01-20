import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import Erro from './src/pages/Erro';
import PageA from './src/pages/PageA';
import Confirmation from './src/pages/Confirmation';
import Finish from './src/pages/Finish';

const Stack = createStackNavigator();

export default function App() {
 
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
      name="Home" 
      component={Home}
      options={{
        title:'Smart Utilities',
        headerStyle:{
          backgroundColor:'#2B7032',
        },
        headerTintColor: '#fff'
      }}
      />
      <Stack.Screen 
      name="PageA" 
      component={PageA} 
      options={{
        title:'',
        headerShown: false,
        headerTransparent: true,
      }}
      />
      <Stack.Screen 
      name="Confirmation" 
      component={Confirmation} 
      options={{
        title:'Identificação',
        headerStyle:{
          backgroundColor:'#3B7032',
        },
        headerTintColor: '#fff',
      }}
      />
      <Stack.Screen 
      name="Finish" 
      component={Finish} 
      options={{
        title:'Etapa concluída',
        headerStyle:{
          backgroundColor:'#3B7032',
        },
        headerTintColor: '#fff',
      }}
      />
    </Stack.Navigator>
   </NavigationContainer>

  );
}
  


