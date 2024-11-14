import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/AppNavigator';
import { MyProvider } from './src/components/screens/context';
import { AudioProvider } from './src/components/screens/AudioContext';

export default function App() {
  return (
    <MyProvider>
      <AudioProvider> 
        {/* <View style={styles.container}> */}
          <AppNavigator />
        {/* </View> */}
      </AudioProvider>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
