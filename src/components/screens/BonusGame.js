// BonusGame.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useMyContext } from './context';
import ScoreScreen from './ScoreScreen'; // Импортируем новый компонент

const { width, height } = Dimensions.get('window');

const goldenCloverImage = require('./golden_clover.png');
const otherCloverImage = require('./greenclover.png');

const BonusGame = ({ navigation }) => {
    const { incrementBonusGame } = useMyContext();
    const [clovers, setClovers] = useState([]);
    const [goldenCloverCount, setGoldenCloverCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const cloverInterval = setInterval(() => {
            const randomX = Math.random() * (width - 60);
            const randomY = Math.random() * (height - 60);
            const isGolden = Math.random() < 0.3;
            const cloverType = isGolden ? 'golden' : 'other';

            const newClover = { x: randomX, y: randomY, type: cloverType };
            setClovers(prev => [...prev, newClover]);

            setTimeout(() => {
                setClovers(prev => prev.filter(clover => clover !== newClover));
            }, 2000);

        }, 500);

        timeoutRef.current = setTimeout(() => {
            endGame();
        }, 10000);

        return () => {
            clearInterval(cloverInterval);
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const endGame = () => {
        incrementBonusGame();
        setGameOver(true); // Устанавливаем игру на завершённую
    };

    const handleCloverPress = (type, clover) => {
        if (type === 'golden') {
            setGoldenCloverCount(prev => prev + 1);
            setClovers(prev => prev.filter(c => c !== clover));
        } else {
            endGame();
        }
    };

    const handleRestart = () => {
        setClovers([]);
        setGoldenCloverCount(0);
        setGameOver(false);
    };

    if (gameOver) {
        return (
            <ScoreScreen
                score={goldenCloverCount}
            />
        );
    }

    return (
        <ImageBackground source={require('./backgroundClover.png')} style={{ flex: 1, resizeMode: 'cover' }}>
            <View style={styles.bonusContainer}>
                {clovers.map((clover, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleCloverPress(clover.type, clover)}
                        style={[styles.clover, { left: clover.x, top: clover.y }]}
                    >
                        <Image
                            source={clover.type === 'golden' ? goldenCloverImage : otherCloverImage}
                            style={styles.cloverImage}
                        />
                    </TouchableOpacity>
                ))}
                <Text style={styles.scoreCounter}>{goldenCloverCount}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bonusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    clover: {
        position: 'absolute',
        width: 70,
        height: 70,
    },
    cloverImage: {
        width: '100%',
        height: '100%',
    },
    scoreCounter: {
        position: 'absolute',
        top: 30,
        right: 30,
        fontSize: 32,
        color: '#fff',
        zIndex: 1,
    },
});

export default BonusGame;
