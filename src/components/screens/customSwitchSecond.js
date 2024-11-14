import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';

const CustomSwitchSecond = ({ baseImage, thumbImage, isEnabled, onToggle }) => {
    const [thumbAnim] = useState(new Animated.Value(isEnabled ? 1 : 0)); // Инициализиуем анимацию

    // Обновляем анимацию при изменении isEnabled
    useEffect(() => {
        thumbAnim.setValue(isEnabled ? 1 : 0);
    }, [isEnabled, thumbAnim]);

    // Переключение свитча
    const toggleSwitch = () => {
        const newValue = !isEnabled;
        onToggle(newValue); // Вызываем функцию для обновления состояния
        Animated.timing(thumbAnim, {
            toValue: newValue ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    // Расчет позиции ползунка
    const thumbPosition = thumbAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20], // Измените значение на соответствующее ваше значение
    });

    return (
        <TouchableOpacity style={styles.switchContainer} onPress={toggleSwitch}>
            <Image source={baseImage} style={styles.baseImage} />
            <Animated.View style={[styles.thumb, { transform: [{ translateX: thumbPosition }] }]}>
                <Image source={thumbImage} style={styles.thumbImage} />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 30,
    },
    baseImage: {
        width: 70,
        height: 30,
        position: 'absolute',
        resizeMode: 'stretch',
    },
    thumb: {
        position: 'absolute',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        left: 0,
    },
    thumbImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default CustomSwitchSecond;
