import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './stacks/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}