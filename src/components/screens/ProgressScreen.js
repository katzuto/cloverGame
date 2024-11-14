import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useMyContext } from './context';

// Импорт изображений
import BackgroundImage from './background.png';
import StarImage from './star_iconImage.png';
import CoinImage from './coin_iconProgress.png';
import QuestionMarkImage from './question_mark.png';
import GoldBorderRect from './frame_2.png';
import ColorRectPurple from './score_strip_green.png';
import ColorRectYellow from './score_strip_yellow.png';
import ColorRectGreen from './score_strip_purple.png';
import { ButtonMenu } from './buttonMenu';

const LevelComponent = ({ navigation }) => {
  const { levels } = useMyContext();

  // Преобразуем levels в массив объектов
  const levelArray = [
    { type: 'star', points: levels.bonusGame, maxPoints: '10' },
    { type: 'coin', points: levels.coins, maxPoints: '100' },
    { type: 'question', points: levels.quiz, maxPoints: '1' }
  ];

  return (
    <View style={styles.container}>
      <Image source={BackgroundImage} style={styles.background} />
      <ButtonMenu navigation={navigation} />

      {levelArray.map((level, index) => (
        <View key={index} style={styles.levelContainer}>
          {/* Внутренний цветной прямоугольник */}
          <Image
            source={
              level.type === 'star'
                ? ColorRectPurple
                : level.type === 'coin'
                ? ColorRectYellow
                : ColorRectGreen
            }
            style={styles.colorRect}
          />
          {/* Золотая обводка */}
          <Image source={GoldBorderRect} style={styles.borderRect} />

          {/* Иконка звезды, монеты или вопроса */}
          <Image
            source={
              level.type === 'star'
                ? StarImage
                : level.type === 'coin'
                ? CoinImage
                : QuestionMarkImage
            }
            style={styles.icon}
          />

          {/* Текст с очками */}
          <Text style={styles.pointsText}>{`${level.points} / ${level.maxPoints}`}</Text>
          {/* Текст уровня */}
          <Text style={styles.levelText}>LEVEL {index + 1}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Положение в строку, как на изображении
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  levelContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative',
    width: 120,
  },
  colorRect: {
    width: 65,
    height: 190,
    top: 10,
    resizeMode: 'stretch',
    zIndex: 1,
  },
  borderRect: {
    position: 'absolute',
    width: 90,
    height: 210,
    resizeMode: 'stretch',
  },
  icon: {
    position: 'absolute',
    top: -60,
    width: 130,
    height: 130,
    resizeMode: 'contain',
    zIndex: 3,
  },
  pointsText: {
    position: 'absolute',
    top: 80,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
  },
  levelText: {
    position: 'absolute',
    bottom: -50,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default LevelComponent;