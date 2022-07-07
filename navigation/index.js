import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Authenticated from './Bottom';
import CoinDetail from '../screens/Detail';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Root" component={Authenticated} />
      <Stack.Screen name="Coin" component={Details} options={{
          presentation: 'modal',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#181818' },
        }}/>
    </Stack.Navigator>
  )
}

export default Navigation;