import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_SIZE = 50; // Размер падающих предметов
const BASKET_WIDTH = 100; // Ширина корзины
const BASKET_HEIGHT = 50; // Высота корзины
const FALL_SPEED = 3000; // Время падения предметов (мс)

const GameComponent = () => {
  const [score, setScore] = useState(0);
  const [missedCoins, setMissedCoins] = useState(0);
  const [items, setItems] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const basketX = useRef(new Animated.Value(SCREEN_WIDTH / 2 - BASKET_WIDTH / 2)).current;
  const itemInterval = useRef(null);

  // Инициализация PanResponder для управления корзиной
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let newBasketX = gestureState.moveX - BASKET_WIDTH / 2;

        // Ограничение по краям экрана
        if (newBasketX < 0) newBasketX = 0;
        if (newBasketX > SCREEN_WIDTH - BASKET_WIDTH) newBasketX = SCREEN_WIDTH - BASKET_WIDTH;

        basketX.setValue(newBasketX);
      },
    })
  ).current;

  // Функция для добавления падающего предмета
  const addItem = () => {
    const newItem = {
      id: Math.random().toString(),
      x: Math.random() * (SCREEN_WIDTH - ITEM_SIZE), // Падение по всей ширине экрана
      y: new Animated.Value(-ITEM_SIZE), // Начало с самого верха экрана
      type: Math.random() > 0.2 ? 'coin' : 'other', // 80% шанс монеты
    };

    setItems((prevItems) => [...prevItems, newItem]);

    Animated.timing(newItem.y, {
      toValue: SCREEN_HEIGHT,
      duration: FALL_SPEED,
      useNativeDriver: false,
    }).start(() => {
      // Удаление предмета, если он не пойман
      setItems((prevItems) => prevItems.filter((item) => item.id !== newItem.id));
      if (newItem.type === 'coin') setMissedCoins((prev) => prev + 1);
    });
  };

  // Запуск интервала для падения предметов
  useEffect(() => {
    itemInterval.current = setInterval(addItem, 1000);
    return () => clearInterval(itemInterval.current);
  }, []);

  // Проверка конца игры
  useEffect(() => {
    if (missedCoins >= 5) {
      setGameOver(true);
      clearInterval(itemInterval.current);
    }
  }, [missedCoins]);

  // Проверка попадания предмета в корзину
  const checkCatch = () => {
    items.forEach((item) => {
      const basketPos = basketX.__getValue();
      if (
        item.y._value >= SCREEN_HEIGHT - BASKET_HEIGHT - ITEM_SIZE &&
        item.x >= basketPos &&
        item.x <= basketPos + BASKET_WIDTH
      ) {
        if (item.type === 'coin') {
          setScore((prevScore) => prevScore + 1);
        } else {
          setScore((prevScore) => Math.max(prevScore - 1, 0));
        }
        setItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Удаляем пойманные предметы
      }
    });
  };

  // Проверка на совпадение между предметами и корзиной
  useEffect(() => {
    const catchInterval = setInterval(checkCatch, 100);
    return () => clearInterval(catchInterval);
  }, [items]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.score}>Score: {score}</Text>
      {items.map((item) => (
        <Animated.View
          key={item.id}
          style={[styles.item, { left: item.x, transform: [{ translateY: item.y }] }]}
        >
          <Image
            source={item.type === 'coin' ? require('./coin.png') : require('./boot.png')}
            style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
          />
        </Animated.View>
      ))}

      {/* Корзина */}
      <Animated.View style={[styles.basket, { transform: [{ translateX: basketX }] }]}>
        <Image source={require('./basket.png')} style={{ width: BASKET_WIDTH, height: BASKET_HEIGHT }} />
      </Animated.View>

      {/* Экран конца игры */}
      {gameOver && (
        <View style={styles.gameOverScreen}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.gameOverText}>Score: {score}</Text>
          <TouchableOpacity
            onPress={() => {
              setGameOver(false);
              setScore(0);
              setMissedCoins(0);
              setItems([]);
              itemInterval.current = setInterval(addItem, 1000);
            }}
          >
            <Text style={styles.restartText}>Restart Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'flex-start', // Изменяем на flex-start
    position: 'relative', // Добавляем для абсолютного позиционирования
  },
  score: {
    position: 'absolute',
    top: 40,
    right: 20,
    fontSize: 24,
    color: 'white',
  },
  item: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
  basket: {
    position: 'absolute',
    bottom: 20,
    width: BASKET_WIDTH,
    height: BASKET_HEIGHT,
  },
  gameOverScreen: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 3,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 32,
    color: 'white',
    marginVertical: 10,
  },
  restartText: {
    fontSize: 24,
    color: '#ff0',
  },
});

export default GameComponent;
