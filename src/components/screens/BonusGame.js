// BonusGame.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const goldenCloverImage = require('./golden_clover.png');
const otherCloverImage = require('./boot.png');

const BonusGame = ({ onEndGame }) => {
    const [clovers, setClovers] = useState([]);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const cloverInterval = setInterval(() => {
            const randomX = Math.random() * (width - 50);
            const isGolden = Math.random() < 0.3; // 30% вероятность золотого клевера
            const cloverType = isGolden ? 'golden' : 'other';

            setClovers(prevClover => [...prevClover, { x: randomX, type: cloverType }]); // Используйте правильное имя переменной здесь

            if (clovers.length >= 10) {
                clearInterval(cloverInterval);
            }
        }, 1000);

        timeoutRef.current = setTimeout(() => {
            clearInterval(cloverInterval);
            onEndGame(false); // Заканчиваем игру, если время вышло
        }, 10000); // 10 секунд

        return () => {
            clearInterval(cloverInterval);
            clearTimeout(timeoutRef.current);
        };
    }, []); // Убедитесь, что эффект не зависит от clovers, чтобы избежать лишних вызовов

    const handleCloverPress = (type) => {
        if (type === 'golden') {
            // Продолжаем бонусную игру
            setClovers([]); // Очистить клеверы (или вы можете добавить логику для продолжения игры)
            return;
        }
        onEndGame(false); // Завершаем игру, если нажали на другой клевер
    };

    return (
        <View style={styles.bonusContainer}>
            {clovers.map((clover, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleCloverPress(clover.type)}
                    style={[styles.clover, { left: clover.x }]}
                >
                    <Image
                        source={clover.type === 'golden' ? goldenCloverImage : otherCloverImage}
                        style={styles.cloverImage}
                    />
                </TouchableOpacity>
            ))}
            <Text style={styles.bonusText}>Нажмите на клевер!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bonusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Темный фон для визуализации
    },
    clover: {
        position: 'absolute',
        width: 50,
        height: 50,
    },
    cloverImage: {
        width: '100%',
        height: '100%',
    },
    bonusText: {
        position: 'absolute',
        bottom: 50,
        fontSize: 24,
        color: '#fff',
    },
});

export default BonusGame;
