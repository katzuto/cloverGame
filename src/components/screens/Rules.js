import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const Rules = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Назад" onPress={() => navigation.goBack()} />
      </View>
      <WebView 
        source={require('./rules.html')} 
        style={styles.webview} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 78, // Отступ слева 70 пикселей
    zIndex: 1, // Обеспечивает размещение кнопки поверх других элементов
    backgroundColor: 'white',
    borderRadius: 10,
  },
  webview: {
    flex: 1,
  },
});

export default Rules;
