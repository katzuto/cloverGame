import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, Alert, ImageBackground } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const basketWidth = 120; // ширина корзины
const itemHeight = 54; // высота предметов (boot или coin)
const coinImage = require('./coin.png');
const bootImage = require('./boot.png');
const basketImage = require('./basket.png');

const GameScreen = () => {
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
      setItems(prev => [...prev, { x: randomX, type, fall: 0 }]);
    }, 1500); // увеличиваем интервал до 1500 мс
  };

  useEffect(() => {
    const fallItems = setInterval(() => {
      setItems(prev => {
        return prev.map(item => {
          const updatedItem = { ...item, fall: item.fall + 2 }; // уменьшаем скорость падения
          if (updatedItem.fall > height) {
            if (updatedItem.type === 'coin') {
              setMissedCoins(prev => prev + 1);
            }
            return null;
          }
          return updatedItem;
        }).filter(Boolean);
      });
    }, 100);
    
    return () => clearInterval(fallItems);
  }, []);

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
      // Проверяем, достиг ли предмет верхней границы корзины
      if (item.fall >= height - itemHeight - 140 && // высота корзины
          item.x >= basketPosition && 
          item.x <= basketPosition + basketWidth) {
        if (item.type === 'coin') {
          setScore(prev => prev + 1);
        } else {
          setScore(prev => Math.max(prev - 1, 0));
        }
        setItems(prev => prev.filter((_, i) => i !== index)); // Удаляем пойманный элемент
      } else if (item.fall >= height) {
        if (item.type === 'coin') {
          setMissedCoins(prev => prev + 1);
        }
      }
    });

    if (missedCoins >= 3) {
      clearInterval(intervalRef.current);
      Alert.alert('Игра окончена', `Вы проиграли! Ваш счет: ${score}`, [{ text: 'OK' }]);
      resetGame();
    }
  };

  useEffect(() => {
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

  return (
    <ImageBackground source={require('./background.png')} style={styles.background}>
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.score}>Счет: {score}</Text>
      <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleGestureEnd}>
        <View style={[styles.basket, { left: basketPosition }]}>
          <Image source={basketImage} style={styles.basketImage} />
        </View>
      </PanGestureHandler>
      {items.map((item, index) => (
        <Image
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
});

export default GameScreen;
