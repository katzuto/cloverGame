// BonusGame.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const goldenCloverImage = require('./golden_clover.png');
const otherCloverImage = require('./boot.png');

const BonusGame = ({ onEndGame }) => {
    const [clovers, setClovers] = useState([]);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const cloverInterval = setInterval(() => {
            const randomX = Math.random() * (width - 60); // Увеличить границы
            const randomY = Math.random() * (height - 60); // Увеличить границы
            const isGolden = Math.random() < 0.3; // 30% вероятность золотого клевера
            const cloverType = isGolden ? 'golden' : 'other';

            // Добавляем новый клевер
            const newClover = { x: randomX, y: randomY, type: cloverType };
            setClovers(prev => [...prev, newClover]);

            // Убираем клевер через 2 секунды
            setTimeout(() => {
                setClovers(prev => prev.filter(clover => clover !== newClover));
            }, 2000);

        }, 500); // Изменить интервал на 500мс для повышения частоты появления предметов

        timeoutRef.current = setTimeout(() => {
            clearInterval(cloverInterval);
            onEndGame(false); // Заканчиваем игру, если время вышло
        }, 10000); // 10 секунд

        return () => {
            clearInterval(cloverInterval);
            clearTimeout(timeoutRef.current);
        };
    }, []); // Убедитесь, что эффект не зависит от clovers, чтобы избежать лишних вызовов

    const handleCloverPress = (type, clover) => {
        if (type === 'golden') {
            // Продолжаем бонусную игру
            // Здесь можно добавить логику для продолжающейся игры
            return;
        }
        // Удаляем нажатый клевер
        setClovers(prev => prev.filter(c => c !== clover));
        onEndGame(false); // Завершаем игру, если нажали на другой клевер
    };

    return (
        <ImageBackground source={require('./backgroundClover.png')} style={{ flex: 1, resizeMode: 'cover' }}>
        <View style={styles.bonusContainer}>
            {clovers.map((clover, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleCloverPress(clover.type, clover)} // Передаем клевер, на который нажали
                    style={[styles.clover, { left: clover.x, top: clover.y }]} // Устанавливаем X и Y координаты
                >
                    <Image
                        source={clover.type === 'golden' ? goldenCloverImage : otherCloverImage}
                        style={styles.cloverImage}
                    />
                </TouchableOpacity>
            ))}
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
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Темный фон для визуализации
    },
    clover: {
        position: 'absolute',
        width: 70,  // Увеличиваем размер клеверов
        height: 70,
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
