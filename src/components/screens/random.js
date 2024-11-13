import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

// Получаем размеры экрана
const { width, height } = Dimensions.get('window');
const basketWidth = 120;
const itemHeight = 60;

// Импорт изображений
const coinImage = require('./coinGame.png');
const bootImage = require('./boot.png');
const flowerImage = require('./flowers.png');
const diamondImage = require('./dimond_pink.png');
const leaveImage = require('./leave.png');
const goldenCloverImage = require('./golden_clover.png');
const basketImage = require('./basket.png');
const backgroundImage = require("./backgroundGame.png");

const GameScreen = ({ navigation }) => {
    const [basketPosition, setBasketPosition] = useState(width / 2 - basketWidth / 2);
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [missedItems, setMissedItems] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const intervalRef = useRef(null);
    const prevBasketPosition = useRef(basketPosition);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!gameOver) {
            startDroppingItems();
            animateItems();
        }
        return () => {
            clearInterval(intervalRef.current);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [gameOver]);

    const startDroppingItems = () => {
        intervalRef.current = setInterval(() => {
            const randomX = Math.random() * (width - 50);
            let type;

            // Генерация случайного предмета
            if (Date.now() % 5000 < 100) {
                type = 'goldenClover';
            } else if (Math.random() < 0.5) {
                type = 'coin';
            } else if (Math.random() < 0.75) {
                type = 'boot';
            } else if (Math.random() < 0.9) {
                type = 'flower';
            } else if (Math.random() < 0.95) {
                type = 'diamond';
            } else {
                type = 'leave';
            }
            setItems(prev => [...prev, { x: randomX, type, fall: 0 }]);
        }, 1500);
    };

    const animateItems = () => {
        setItems(prevItems =>
            prevItems
                .map(item => ({
                    ...item,
                    fall: item.fall + 5, // Скорость падения
                }))
                .filter(item => item.fall < height + itemHeight) // Удаляем предметы, которые вышли за пределы экрана
        );

        animationFrameRef.current = requestAnimationFrame(animateItems);
    };

    const handleGestureEvent = (event) => {
        if (!gameOver) {
            const newPosition = prevBasketPosition.current + event.nativeEvent.translationX;
            if (newPosition >= 0 && newPosition <= width - basketWidth) {
                setBasketPosition(newPosition);
            }
        }
    };

    const handleGestureEnd = () => {
        prevBasketPosition.current = basketPosition;
    };

    const updateScore = (type) => {
        if (type === 'coin') setScore(prevScore => prevScore + 10);
        else if (type === 'goldenClover') setScore(prevScore => prevScore + 50);
    };

    const checkCollision = () => {
        setItems(prevItems => {
            return prevItems.filter(item => {
                const itemBottom = item.fall + itemHeight;
                const basketTop = height - 140; // Корзина немного выше края экрана

                // Проверка столкновения с корзиной
                if (
                    itemBottom >= basketTop && // Предмет ниже верхней части корзины
                    item.x + 30 >= basketPosition && // Предмет находится вовнутрь корзины по оси X
                    item.x <= basketPosition + basketWidth
                ) {
                    updateScore(item.type);
                    return false; // Удаляем предмет, если он пойман
                } else if (itemBottom >= height) {
                    if (item.type === 'coin') {
                        setMissedItems(prev => prev + 1); // Увеличиваем количество пропущенных предметов
                    }
                    return false; // Удаляем предмет, если он упал
                }
                return true; // Оставляем предмет, если он не встретился с корзиной
            });
        });

        // Проверка на конец игры
        if (missedItems >= 3) {
            setGameOver(true);
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        const collisionInterval = setInterval(checkCollision, 50); // Проверяем столкновения
        return () => clearInterval(collisionInterval);
    }, [items, missedItems]);

    const HomeMenuHandler = () => {
        navigation.goBack();
    };

    const ButtonMenu = ({ onClick }) => (
        <TouchableOpacity style={styles.buttonmenu} onPress={onClick} activeOpacity={0.8}>
            <Image source={require('./home_icon.png')} style={styles.buttonImage2menu} />
        </TouchableOpacity>
    );

    // Экран проигрыша
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
    finalScore: {
        fontSize: 24,
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

export default GameScreen;
