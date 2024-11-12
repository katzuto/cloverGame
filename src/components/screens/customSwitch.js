import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const CustomSwitch = ({ isEnabled, onToggle, baseImage, thumbImage }) => {
    const [thumbAnim] = useState(new Animated.Value(isEnabled ? 1 : 0));

    const toggleSwitch = () => {
        onToggle(!isEnabled);
        Animated.timing(thumbAnim, {
            toValue: isEnabled ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const thumbPosition = thumbAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20], // Измените значение 30 на ширину вашего ползунка
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
        width: 60, // Ширина вашего переключателя
        height: 30, // Высота вашего переключателя
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
        width: 40, // Ширина ползунка
        height: 40, // Высота ползунка
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