import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, ImageBackground } from 'react-native';

const PulsingClover = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current; // Начальный масштаб

  useEffect(() => {
    // Анимация пульсации
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2, // Увеличиваем размер
          duration: 1000, // Длительность анимации
          useNativeDriver: true, // Использование нативного драйвера для улучшения производительности
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Возвращаем размер обратно
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start(); // Запускаем анимацию

    // Очищаем анимацию при размонтировании компонента
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <ImageBackground 
      source={require('./background.png')}
      style={styles.background}
    >
    <View style={styles.container}>
      {/* Пульсирующий клевер */}
      <Animated.View style={[styles.cloverWrapper, { transform: [{ scale: pulseAnim }] }]}>
        <Image 
          source={ require('./clover.png')} // Замените на путь к изображению
          style={styles.cloverImage}
        />
      </Animated.View>

      {/* Текст "loading" */}
      <Text style={styles.loadingText}>loading</Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cloverWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  cloverImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  loadingText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: 'medium',
  },
});

export default PulsingClover;
