// src/CustomSwitch.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useMyContext } from './context'; // Импортируйте свой контекст

const CustomSwitch = ({ baseImage, thumbImage }) => {
    const { isCustomSwitchEnabled, updateCustomSwitch } = useMyContext();
     // Извлеките состояние и функцию
    const [thumbAnim] = useState(new Animated.Value(isCustomSwitchEnabled ? 1 : 0)); // Используйте состояние из контекста

    useEffect(() => {
        thumbAnim.setValue(isCustomSwitchEnabled ? 1 : 0); // Анимация при изменении состояния
    }, [isCustomSwitchEnabled, thumbAnim]);

    const toggleSwitch = () => {
        const newValue = !isCustomSwitchEnabled;
        updateCustomSwitch(newValue); // Обновите состояние через контекст

        Animated.timing(thumbAnim, {
            toValue: newValue ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

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

export default CustomSwitch;
