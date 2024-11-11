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
                alert("Вы выиграли! Ваш счет: " + (score + 1)); // Учитываем правильный ответ
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

    const ButtonWithOverlay = ({ label, onClick }) => (
        <TouchableOpacity style={styles.button} onPress={onClick} activeOpacity={0.8}>
            <Image source={require('./frame_for_answer.png')} style={styles.buttonImage2} />
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    const ButtonFrameQuestion = ({ label }) => (
        <View style={styles.frameQuest}>
            <Image source={require('./frame_for_question.png')} style={styles.questionFrame} />
            <Text style={styles.buttonText}>{label}</Text>
        </View>
    );

    const renderOptions = () => {
        const options = questions[currentQuestion].options;
        const optionPairs = [];

        for (let i = 0; i < options.length; i += 2) {
            optionPairs.push(options.slice(i, i + 2));
        }

        return optionPairs.map((pair, index) => (
            <View style={styles.optionRow} key={index}>
                {pair.map((option) => (
                    <ButtonWithOverlay
                        key={option}
                        label={option}
                        onClick={() => handleAnswer(option)}
                    />
                ))}
            </View>
        ));
    };

    return (
        <ImageBackground source={require('./background.png')} style={styles.background}>
            <View style={styles.container}>
                {!gameOver ? (
                    <View style={styles.quizContainer}>
                        <ButtonFrameQuestion label={questions[currentQuestion].question} />
                        <View style={styles.optionsContainer}>
                            {renderOptions()}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        alignItems: 'center',
        paddingTop: 20,
        width: '100%',
    },
    questionFrame: { 
        position: 'absolute', 
        width: '150%', 
        height: 250, 
        resizeMode: 'contain'
    },
    optionRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '50%',
    },
    buttonText: {
        position: 'absolute',
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        top: '40%',
        transform: [{ translateY: -0.5 * (20 / 2) }],
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    buttonImage2: {
        width: '150%',
        height: 150,
        resizeMode: 'contain',
    },
    frameQuest: {
        width: 400,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    quizContainer: {
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
    button: {
        width: 150,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default QuizScreen;
