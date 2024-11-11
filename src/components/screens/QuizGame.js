import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';

// Пример вопросов по теме "Клевер"
const questions = [
    { question: "Какое растение символизирует удачу?", options: ["Клевер", "Роза", "Лилия", "Тюльпан"], answer: "Клевер" },
    { question: "Сколько листьев у четырехлистного клевера?", options: ["4", "3", "5", "6"], answer: "4" },
    // Добавьте еще 18 вопросов
];

const QuizScreen = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].answer) {
            setScore(score + 1);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                alert("Вы выиграли! Ваш счет: " + score);
            }
        } else {
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setGameOver(false);
    };

    const ButtonWithOverlay = ({ label, onClick, key }) => {
        return (
            <TouchableOpacity key={key} style={styles.button} onPress={onClick} activeOpacity={0.8}>
                <Image source={require('./button_base.png')} style={styles.buttonImage2} />
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground 
            source={require('./background.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                    <Image source={require('./settings.png')} style={styles.homeIcon} />
                </TouchableOpacity>

                {!gameOver ? (
                    <View style={styles.quizContainer}>
                        <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                        
                        {/* Новая обертка для кнопок */}
                        <View style={styles.optionsContainer}>
                            {questions[currentQuestion].options.map((option, index) => (
                                <ButtonWithOverlay
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    label={option}
                                /> 
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.gameOverContainer}>
                        <Text style={styles.gameOverText}>Вы проиграли! Ваш счет: {score}</Text>
                        <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
                            <Text style={styles.resetText}>Начать заново</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    optionsContainer: {
        flexDirection: 'row', // Выровнять кнопки в строку
        flexWrap: 'wrap', // Позволяет переносить кнопки на новую строку
        justifyContent: 'center', // Центруем кнопки
    },
    buttonText: {
        position: 'absolute',
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        top: '37%',
        transform: [{ translateY: -0.5 * (20 / 2) }],
    },
    buttonImage2: {
        position: 'absolute',
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    homeIcon: {
        width: 30,
        height: 30,
        marginBottom: 20,
    },
    quizContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 50,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverText: {
        fontSize: 24,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    resetButton: {
        backgroundColor: '#888',
        padding: 15,
        borderRadius: 8,
    },
    resetText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default QuizScreen;
