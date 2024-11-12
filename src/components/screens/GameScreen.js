import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, Alert, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const basketWidth = 120;
const itemHeight = 54; 
const coinImage = require('./coin.png');
const bootImage = require('./boot.png');
const basketImage = require('./basket.png');

const GameScreen = ({ navigation }) => {
  const [basketPosition, setBasketPosition] = useState(width / 2 - basketWidth / 2);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [missedCoins, setMissedCoins] = useState(0);
  const intervalRef = useRef(null);
  const prevBasketPosition = useRef(basketPosition);

  useEffect(() => {
    startDroppingItems();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startDroppingItems = () => {
    intervalRef.current = setInterval(() => {
      const randomX = Math.random() * (width - 50);
      const type = Math.random() < 0.5 ? 'coin' : 'boot';
      const fallValue = new Animated.Value(0);
      setItems(prev => [...prev, { x: randomX, type, fall: fallValue }]);
      dropItem(fallValue);
    }, 2000);
  };

  const dropItem = (fallValue) => {
    Animated.timing(fallValue, {
      toValue: height,
      duration: 3000, // измените на нужное время
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setItems(prev => prev.filter(item => item.fall !== fallValue));  // удаляем элемент при завершении анимации
        setMissedCoins(prev => prev + 1);
      }
    });
  };

  const handleGestureEvent = (event) => {
    const newPosition = prevBasketPosition.current + event.nativeEvent.translationX;
    if (newPosition >= 0 && newPosition <= width - basketWidth) {
      setBasketPosition(newPosition);
    }
  };

  const handleGestureEnd = () => {
    prevBasketPosition.current = basketPosition;
  };

  const checkCollision = () => {
    items.forEach((item, index) => {
      item.fall.addListener(({ value }) => {
        if (value >= height - itemHeight - 220 && 
            item.x >= basketPosition && 
            item.x <= basketPosition + basketWidth) {
          if (item.type === 'coin') {
            setScore(prev => prev + 1);
          } else {
            setScore(prev => Math.max(prev - 1, 0));
          }
          setItems(prev => prev.filter((_, i) => i !== index));
          item.fall.removeAllListeners();
        }
      });
    });

    if (missedCoins >= 3) {
      clearInterval(intervalRef.current);
      Alert.alert('Игра окончена', `Вы проиграли! Ваш счет: ${score}`, [{ text: 'OK' }]);
      resetGame();
    }
  };

  useEffect(() => {
    // Устанавливаем проверку на столкновение
    const checkCollisionInterval = setInterval(checkCollision, 100);
    return () => clearInterval(checkCollisionInterval);
  }, [items, missedCoins]);

  const resetGame = () => {
    setItems([]);
    setScore(0);
    setMissedCoins(0);
    setBasketPosition(width / 2 - basketWidth / 2);
    prevBasketPosition.current = width / 2 - basketWidth / 2;
    startDroppingItems();
  };

  const ButtonWithOverlay = ({ onClick }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onClick} activeOpacity={0.8}>
        <Image source={require('./home_icon.png')} style={styles.buttonImage2} />
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('./background.png')} style={styles.background}>
      <ButtonWithOverlay onClick={() => navigation.navigate('Menu')} />
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.score}>Счет: {score}</Text>
        <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleGestureEnd}>
          <View style={[styles.basket, { left: basketPosition }]}>
            <Image source={basketImage} style={styles.basketImage} />
          </View>
        </PanGestureHandler>
        {items.map((item, index) => (
          <Animated.Image
            key={index}
            source={item.type === 'coin' ? coinImage : bootImage}
            style={[styles.item, { left: item.x, top: item.fall }]}
          />
        ))}
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  score: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  basket: {
    position: 'absolute',
    bottom: 40,
    width: basketWidth,
  },
  basketImage: {
    width: basketWidth,
    height: 100,
  },
  item: {
    position: 'absolute',
    width: 50,
    height: itemHeight,
  },
  button: {
    display: 'flex',
    width: 150,
    height: 50, 
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage2: {
    position: 'absolute',
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  buttonText: {
    position: 'absolute',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'medium',
    textAlign: 'center',
    top: '50%',
    transform: [{ translateY: -0.5 * (20 / 2) }],
  },
});

export default GameScreen;