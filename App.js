// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/AppNavigator';
import { MyProvider } from './src/components/screens/context';

export default function App() {
  
  return (
  <MyProvider>
    <AppNavigator />
  </MyProvider>
)
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
