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
import BonusGame from './BonusGame'; // Правильный путь к файлу BonusGame.js
import { ButtonMenu } from './buttonMenu';

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
const bonusImage = require('./BONUS_PLAY_ZASTAVKA.png');
const backgroundImage = require("./backgroundGame.png");

const GameScreen = ({ navigation }) => {
    const [basketPosition, setBasketPosition] = useState(width / 2 - basketWidth / 2);
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [missedItems, setMissedItems] = useState(0);
    const [isBonusGame, setIsBonusGame] = useState(false);
  
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

            if (randomType < 0.5) {
                type = 'goldenClover';
            } else if (randomType < 0.2) {
                type = 'coin';
            } else if (randomType < 0.4) {
                type = 'boot';
            } else if (randomType < 0.6) {
                type = 'flower';
            } else if (randomType < 0.8) {
                type = 'diamond';
            } else {
                type = 'leave';
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
            if (
                item.fall >= height - itemHeight - 140 &&
                item.x >= basketPosition &&
                item.x <= basketPosition + basketWidth
            ) {
                if (item.type === 'goldenClover') {
                    setIsBonusGame(true); // Входим в бонусную игру
                } else {
                    updateScore(item.type);
                }
                setItems(prev => prev.filter((_, i) => i !== index));
            }
        });

        if (missedItems >= 3) {
            clearInterval(intervalRef.current);
            resetGame();
        }
    };

    useEffect(() => {
        const checkCollisionInterval = setInterval(checkCollision, 100);
        return () => clearInterval(checkCollisionInterval);
    }, [items, missedItems]);

    const resetGame = () => {
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

    const endBonusGame = (isContinued) => {
        setIsBonusGame(false);
        if (!isContinued) {
            resetGame(); // Сбрасываем игру, если не было золотого клевера
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
                    {/* <ButtonMenu onClick={HomeMenuHandler} /> */}
                    <ButtonMenu navigation={navigation} />
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
                                item.type === 'leave' ? leaveImage : 
                                item.type === 'goldenClover' ? goldenCloverImage : null
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
