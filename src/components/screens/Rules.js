import React from 'react';
import { Button, SafeAreaView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import WebView from 'react-native-webview';

const Rules = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonmenu} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Image source={require('./home_icon.png')} style={styles.buttonImage2menu} />
        </TouchableOpacity>
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
    width: 50, // Ширина кнопки
    height: 50, // Высота кнопки
  },
  buttonmenu: {
    width: 50, // Ширина кнопки
    height: 50, // Высота кнопки
  },
  buttonImage2menu: {
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
  },
});

export default Rules;
