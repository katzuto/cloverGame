import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground } from 'react-native';

// Получаем размеры экрана
const { width, height } = Dimensions.get('window');

// Импорт изображений
const bonusImage = require('./BONUS_PLAY_ZASTAVKA.png');
const goldenCloverImage = require('./golden_clover.png');
const backgroundImage = require('./backgroundGame.png');

const BonusGame = () => {
    const [showBonusScreen, setShowBonusScreen] = useState(true);
    const navigation = useNavigation(); // Создаем объект навигации
    const [score, setScore] = useState(0);
    const [clovers, setClovers] = useState([]);
    const [gameDuration, setGameDuration] = useState(10); // Длительность игры
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const cloverIntervalRef = useRef(null);

    // Задержка показа бонусного экрана
    useEffect(() => {
        const bonusTimer = setTimeout(() => {
            setShowBonusScreen(false);
            startGame();
        }, 1000); // Пауза 1 секунда перед началом игры

        return () => clearTimeout(bonusTimer);
    }, []);

    const startGame = () => {
        setGameStarted(true);
        generateClovers();
        const gameTimer = setTimeout(() => {
            setGameOver(true);
            clearInterval(cloverIntervalRef.current); // Останавливаем генерацию клеверов
        }, gameDuration * 1000);

        return () => clearTimeout(gameTimer);
    };

    const generateClovers = () => {
        cloverIntervalRef.current = setInterval(() => {
            const randomX = Math.random() * (width - 60); // Ширина клевера
            const randomY = Math.random() * (height - 60); // Высота клевера
            setClovers(prev => [...prev, { x: randomX, y: randomY }]);
        }, 500); // Генерация каждые 0.5 секунды
    };

    const handleClickClover = (index) => {
        setScore(prevScore => prevScore + 1);
        setClovers(prev => prev.filter((_, i) => i !== index)); // Удаляем клевера при клике
    };

    const returnToMenu = () => {
        navigation.goBack();
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            {showBonusScreen ? (
                <View style={styles.bonusScreen}>
                    <Image source={bonusImage} style={styles.bonusImage} />
                </View>
            ) : gameOver ? (
                <View style={styles.resultScreen}>
                    <Text style={styles.resultText}>Ваш счет: {score}</Text>
                    <TouchableOpacity style={styles.menuButton} onPress={returnToMenu}>
                        <Text style={styles.menuButtonText}>В меню</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.gameContainer}>
                    {clovers.map((clover, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.clover, { left: clover.x, top: clover.y }]}
                            onPress={() => handleClickClover(index)}
                        >
                            <Image source={goldenCloverImage} style={styles.cloverImage} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bonusScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bonusImage: {
        width: width * 0.8,
        height: height * 0.4,
        resizeMode: 'contain',
    },
    gameContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    clover: {
        position: 'absolute',
    },
    cloverImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    resultScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    menuButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    menuButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default BonusGame;
