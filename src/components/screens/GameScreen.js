import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import BonusGame from './BonusGame'; // Правильный путь к файлу BonusGame.js
import { ButtonMenu } from './buttonMenu';
import { useMyContext } from './context'; // Импортируйте хук

const { width, height } = Dimensions.get('window');
const basketWidth = 120;
const itemHeight = 60;

const coinImage = require('./coinGame.png');
const bootImage = require('./boot.png');
const flowerImage = require('./flowers.png');
const diamondImage = require('./dimond_pink.png');
const leaveImage = require('./leave.png');
const goldenCloverImage = require('./golden_clover.png');
const basketImage = require('./basket.png');
const backgroundImage = require('./backgroundGame.png');

const GameScreen = ({ navigation }) => {
  const [basketPosition, setBasketPosition] = useState(width / 2 - basketWidth / 2);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [missedItems, setMissedItems] = useState(0);
  const [isBonusGame, setIsBonusGame] = useState(false);
  const { updateCoins } = useMyContext();

  const intervalRef = useRef(null);
  const prevBasketPosition = useRef(basketPosition);

  useEffect(() => {
    startDroppingItems();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startDroppingItems = () => {
    intervalRef.current = setInterval(() => {
      const randomX = Math.random() * (width - 10);
      const randomType = Math.random();
      let type;

      if (randomType < 0.1) {
        type = 'goldenClover';
      } else if (randomType < 0.5) {
        type = 'coin';
      } else if (randomType < 0.8) {
        type = 'boot';
      } else if (randomType < 0.6) {
        type = 'flower';
      } else if (randomType < 0.9) {
        type = 'diamond';
      } else {
        type = 'leave';
      }

      setItems(prev => [...prev, { x: randomX, type, fall: new Animated.Value(0), caught: false }]);
    }, 1000);
  };

  useEffect(() => {
    items.forEach(item => {
      Animated.timing(item.fall, {
        toValue: height,
        duration: 600,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    });
  }, [items]);

  useEffect(() => {
    const checkCollisionInterval = setInterval(() => {
      checkCollision();
    }, 10);

    return () => clearInterval(checkCollisionInterval);
  }, [items]);

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
    // Создадим копию массива items для фильтрации
    let updatedItems = [...items];

    updatedItems.forEach((item, index) => {
      const itemFallValue = item.fall._value;

      // Проверяем, достиг ли предмет верхней границы корзины
      if (!item.caught && itemFallValue >= height - (itemHeight + 140) && // Корректируем значение, чтобы учитывать высоту корзины
          item.x >= basketPosition &&
          item.x <= basketPosition + basketWidth) {

        // Устанавливаем предмет как пойманный
        updatedItems[index].caught = true;

        // Обработка типа предмета
        if (item.type === 'goldenClover') {
          setIsBonusGame(true);
        } else {
          updateScore(item.type);
        }
      }
    });

    // Формируем новый массив без предметов, которые были пойманы
    const newItems = updatedItems.filter(item => !item.caught);
    setItems(newItems); // Устанавливаем новые значения для items

    const missedItemsCount = newItems.filter(item => item.fall._value >= height).length;
    setMissedItems(prev => prev + missedItemsCount);

    if (missedItemsCount > 0) {
      // Если были пропущенные предметы, убираем их из массива
      setItems(newItems); // Удаляем из items только предметы, которые не пойманы (включая пропущенные)
    }

    // Проверяем условие на завершение игры при пропуске более 3 предметов
    if (missedItems >= 3) {
      clearInterval(intervalRef.current);
      resetGame();
    }
};

  const resetGame = () => {
    updateCoins(score);
    setItems([]);
    setScore(0);
    setMissedItems(0);
    setBasketPosition(width / 2 - basketWidth / 2);
    prevBasketPosition.current = width / 2 - basketWidth / 2;
    setIsBonusGame(false);
  };

  const updateScore = (type) => {
    switch (type) {
      case 'coin':
        setScore(prev => {
          const newScore = prev + 1;
          updateCoins(1);
          return newScore;
        });
        break;
      case 'boot':
      case 'flower':
      case 'diamond':
      case 'leave':
        setScore(prev => Math.max(prev - 1, 0));
        break;
      default:
        break;
    }
  };

  const endBonusGame = (isContinued) => {
    setIsBonusGame(false);
    if (!isContinued) {
      resetGame();
    }
  };

  const HomeMenuHandler = () => {
    navigation.goBack();
  };

  if (isBonusGame) {
    return <BonusGame onEndGame={endBonusGame} />;
  }

  return (
    <>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <GestureHandlerRootView style={styles.container}>
          <ButtonMenu navigation={navigation} />
          <Text style={styles.score}>Score: {score}</Text>
          <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleGestureEnd}>
            <View style={[styles.basket, { left: basketPosition }]}>
              <Image source={basketImage} style={styles.basketImage} />
            </View>
          </PanGestureHandler>
          {items.map((item, index) => (
            <Animated.Image
              key={index}
              source={
                {
                  coin: coinImage,
                  boot: bootImage,
                  flower: flowerImage,
                  diamond: diamondImage,
                  leave: leaveImage,
                  goldenClover: goldenCloverImage
                }[item.type]
              }
              style={[styles.item, { left: item.x, top: item.fall }]}
            />
          ))}
        </GestureHandlerRootView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  score: {
    position: 'absolute',
    top: 12,
    right: 10,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
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
    width: 60,
    height: itemHeight,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
