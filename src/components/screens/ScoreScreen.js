// ScoreScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarImage from './star_iconImage.png';
import { ButtonMenu } from './buttonMenu';

const ScoreScreen = ({ score }) => {
    const navigation = useNavigation();
    const leaveImage = require('./backgroundBonusGame.png');

    const ButtonWithOverlay = ({ label }) => (
        <TouchableOpacity style={styles.buttonText}>
            <Image source={require('./frame_for_answer.png')} style={styles.buttonImage2} />
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={leaveImage} style={styles.background}>
        <View style={styles.container}>
            <Image source={StarImage} style={styles.starImage} />
            <Text style={styles.title}>Final score</Text>
            <ButtonWithOverlay>{score}</ButtonWithOverlay>
            <TouchableOpacity style={styles.button} onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Menu' }],
            })}>
                <Text style={styles.buttonText}>На Главную</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starImage: {
        width: 350,
        height: 350,
        top: -30
    },
    title: {
        fontSize: 62,
        color: '#fff',
        marginBottom: -20,
        top: -150,
        fontWeight: '900',
    },
    buttonText: {
        width: 150,
        height: 50,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    score: {
        fontSize: 48,
        color: '#FFD700', // Золотым цветом
        marginBottom: 50,
    },
    buttonImage2: {
        width: 260,
        height: 70,
        top: 120,
        resizeMode: 'contain',
    },
    button: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
    buttonText: {
        position: 'absolute',
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'medium',
        textAlign: 'center',
        top: '40%',
        transform: [{ translateY: -0.5 * (20 / 2) }],
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default ScoreScreen;

