import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const basketWidth = 120;
const itemHeight = 60;

const coinImage = require('./coinGame.png');
const bootImage = require('./boot.png');
const flowerImage = require('./flowers.png');
const diamondImage = require('./dimond_pink.png');
const leaveImage = require('./leave.png');
const basketImage = require('./basket.png');
const backgroundImage = require('./backgroundGame.png');
const goldenCloverImage = require('./golden_clover.png');

const GameScreen = () => {
    const navigation = useNavigation();
    const [basketPosition, setBasketPosition] = useState(width / 2 - basketWidth / 2);
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [missedItems, setMissedItems] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const intervalRef = useRef(null);
    const prevBasketPosition = useRef(basketPosition);

    useEffect(() => {
        startDroppingItems();
        return () => clearInterval(intervalRef.current);
    }, []);

    const startDroppingItems = () => {
        intervalRef.current = setInterval(() => {
            const randomX = Math.random() * (width - 50);
            const randomType = Math.random();
            let type;

            // Обратите внимание на уловки вероятностей, чтобы goldenClover появлялся реалистичнее
            if (randomType < 0.5) {
                type = 'goldenClover';  // 10% шанс появления
            } else if (randomType < 0.5) {
                type = 'coin';           // 40% шанс
            } else if (randomType < 0.6) {
                type = 'boot';           // 10% шанс
            } else if (randomType < 0.7) {
                type = 'flower';         // 10% шанс
            } else if (randomType < 0.85) {
                type = 'diamond';        // 15% шанс
            } else {
                type = 'leave';          // 15% шанс
            }

            setItems(prev => [...prev, { x: randomX, type, fall: 0 }]);
        }, 1500);
    };

    useEffect(() => {
        const fallItems = setInterval(() => {
            setItems(prev => {
                return prev.map(item => {
                    const updatedItem = { ...item, fall: item.fall + 20 };
                    if (updatedItem.fall > height) {
                        if (item.type === 'coin') {
                            setMissedItems(prev => prev + 1);
                        }
                        return null;
                    }
                    return updatedItem;
                }).filter(Boolean);
            });
        }, 50);

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
            if (
                item.fall >= height - itemHeight - 140 &&
                item.x >= basketPosition &&
                item.x <= basketPosition + basketWidth
            ) {
                if (item.type === 'goldenClover') {
                    // handleBonusClick(); // Передаем управление при ловле goldenClover
                    updateScore(item.type);
                } else {
                    updateScore(item.type); // Обновляем счет для других предметов
                }
                
                setItems(prev => prev.filter((_, i) => i !== index)); // Удаляем пойманный предмет
            }
        });

        // Проверка на пропущенные предметы
        if (missedItems >= 3) {
            setGameOver(true);
            clearInterval(intervalRef.current);
            resetGame();
        }
    };

    useEffect(() => {
        const checkCollisionInterval = setInterval(checkCollision, 10);
        return () => clearInterval(checkCollisionInterval);
    }, [items, missedItems]);

    const resetGame = () => {
        setItems([]);
        setScore(0);
        setMissedItems(0);
        setBasketPosition(width / 2 - basketWidth / 2);
        prevBasketPosition.current = width / 2 - basketWidth / 2;
        startDroppingItems();
    };

    const updateScore = (type) => {
        switch (type) {
            case 'coin':
                setScore(prev => prev + 1);
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

    const handleBonusClick = () => {
        clearInterval(intervalRef.current);
        navigation.navigate('BonusGame'); // Переход на экран BonusGame
    };

    const HomeMenuHandler = () => {
        navigation.goBack();
    };

    const ButtonMenu = ({ onClick }) => (
        <TouchableOpacity style={styles.buttonmenu} onPress={onClick} activeOpacity={0.8}>
            <Image source={require('./home_icon.png')} style={styles.buttonImage2menu} />
        </TouchableOpacity>
    );

    if (gameOver) {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>Вы проиграли</Text>
                    <Text style={styles.finalScore}>Ваш счет: {score}</Text>
                    <TouchableOpacity style={styles.menuButton} onPress={() => {
                        setGameOver(false);
                        setScore(0);
                        setMissedItems(0);
                        setItems([]);
                        startDroppingItems();
                    }}>
                        <Text style={styles.menuButtonText}>Играть снова</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GestureHandlerRootView style={styles.container}>
                <ButtonMenu onClick={HomeMenuHandler} />
                <Text style={styles.score}>{score}</Text>
                <PanGestureHandler onGestureEvent={handleGestureEvent} onEnded={handleGestureEnd}>
                    <View style={[styles.basket, { left: basketPosition }]}>
                        <Image source={basketImage} style={styles.basketImage} />
                    </View>
                </PanGestureHandler>
                {items.map((item, index) => (
                    <Image
                        key={index}
                        source={
                            item.type === 'coin' ? coinImage :
                            item.type === 'boot' ? bootImage :
                            item.type === 'flower' ? flowerImage :
                            item.type === 'diamond' ? diamondImage :
                            item.type === 'goldenClover' ? goldenCloverImage :
                            item.type === 'leave' ? leaveImage : null
                        }
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    gameOverContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ff0000',
        marginBottom: 20,
    },
    menuButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    finalScore: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
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
    buttonmenu: {
        display: 'flex',
        width: 70,
        height: 70,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        position: 'absolute',
    },
    buttonImage2menu: {
        position: 'absolute',
        width: '100%',
        height: 70,
        resizeMode: 'contain',
    },
});

export default GameScreen;
