// QuizScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { useMyContext } from './context'; // Импортируем хук

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Пример вопросов по теме "Клевер"
const questions = [
    { question: "How many leaves does a four-leaf clover have?", options: ["4", "3", "5", "6"], answer: "4" },
    { question: "What color is considered a symbol of luck?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Green" },
    { question: "In which country is the clover an official symbol of luck?", options: ["USA", "Ireland", "Japan", "France"], answer: "Ireland" },
    { question: "Which plant symbolizes luck?", options: ["Clover", "Rose", "Lily", "Tulip"], answer: "Clover" },
    { question: "What color is associated with luck?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Green" },
    { question: "What item is often used to attract luck?", options: ["Horseshoe", "Key", "Coin", "Ring"], answer: "Horseshoe" },
    { question: "What day of the week is considered the luckiest?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Thursday" },
    { question: "What symbol is often used to attract luck?", options: ["Cross", "Star", "Heart", "Triangle"], answer: "Star" },
    { question: "What month is considered the luckiest to start new ventures?", options: ["January", "February", "March", "April"], answer: "March" },
    { question: "What item is often worn to attract luck?", options: ["Bracelet", "Ring", "Pendant", "Watch"], answer: "Pendant" },
    { question: "What color is often used to attract luck in Feng Shui?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Red" },
    { question: "What item is often placed under a pillow to attract luck?", options: ["Coin", "Key", "Ring", "Stone"], answer: "Coin" },
    { question: "What day of the week is considered the unluckiest?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Monday" },
    { question: "What item is often hung above a door to attract luck?", options: ["Horseshoe", "Key", "Coin", "Ring"], answer: "Horseshoe" },
    { question: "What color is associated with luck in China?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Red" },
    { question: "What item is often used to attract luck in Japan?", options: ["Horseshoe", "Key", "Hotei Coin", "Hotei Ring"], answer: "Hotei Coin" },
    { question: "What day of the week is considered the luckiest for weddings?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Thursday" },
    { question: "What item is often used to attract luck in India?", options: ["Horseshoe", "Key", "Ankush", "Ring"], answer: "Ankush" },
    { question: "What color is associated with luck in Ireland?", options: ["Red", "Green", "Blue", "Yellow"], answer: "Green" },
    { question: "What item is often used to attract luck in Russia?", options: ["Horseshoe", "Key", "Coin", "Ring"], answer: "Horseshoe" },
    { question: "What day of the week is considered the luckiest to start new projects?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Wednesday" },
    { question: "What item is often used to attract luck in Europe?", options: ["Horseshoe", "Key", "Coin", "Ring"], answer: "Horseshoe" },
    { question: "What day of the week is considered the luckiest for financial operations?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Wednesday" },
    { question: "What item is often used to attract luck in South America?", options: ["Horseshoe", "Key", "Amulet", "Ring"], answer: "Amulet" },
    { question: "What day of the week is considered the luckiest for travel?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Thursday" },
    { question: "What item is often used to attract luck in North America?", options: ["Horseshoe", "Key", "Amulet", "Ring"], answer: "Amulet" },
    { question: "What day of the week is considered the luckiest for romantic meetings?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Wednesday" },
    { question: "What item is often used to attract luck in Australia?", options: ["Horseshoe", "Key", "Amulet", "Ring"], answer: "Amulet" },
    { question: "What amulet is considered a symbol of luck in Egypt?", options: ["Eye of Horus", "Pentagram", "Scepter", "Ankh"], answer: "Eye of Horus" },
    { question: "What symbol is considered lucky in Feng Shui?", options: ["Dragon", "Lotus", "Butterfly", "Cat"], answer: "Dragon" },
    { question: "What day of the week is considered lucky for signing contracts?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Tuesday" },
    { question: "What color is associated with luck in Japan?", options: ["Red", "Green", "Blue", "Black"], answer: "Red" },
    { question: "What day of the week is considered lucky to start studying?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: "Monday" },
    { question: "What talisman brings luck in Africa?", options: ["Horseshoe", "Stone", "Amulet", "Ancient symbol"], answer: "Amulet" },
    { question: "What item brings luck in Arab countries?", options: ["Horseshoe", "Stone", "Wonder Stone", "Incense"], answer: "Wonder Stone" }
];

const QuizScreen = ({ navigation }) => {
    const { incrementQuiz } = useMyContext();
    const [shuffledQuestions, setShuffledQuestions] = useState(shuffleArray([...questions]));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === shuffledQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }

        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Смотрим, все ли ответы правильные
            if (score + 1 === shuffledQuestions.length) {
                incrementQuiz(); // Увеличиваем уровень викторины, если все ответы правильные
            }
            setGameOver(true); // Завершаем игру после последнего вопроса
        }
    };

    const resetGame = () => {
        setShuffledQuestions(shuffleArray([...questions]));
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

    const renderOptions = () => {
        const options = shuffledQuestions[currentQuestion].options;
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

    const ButtonMenu = ({ onClick }) => (
        <TouchableOpacity style={styles.buttonmenu} onPress={onClick} activeOpacity={0.8}>
            <Image source={require('./home_icon.png')} style={styles.buttonImage2menu} />
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={require('./background.png')} style={styles.background}>
            <ButtonMenu onClick={() => navigation.goBack()} />
            <View style={styles.container}>
                {!gameOver ? (
                    <View style={styles.quizContainer}>
                        <View style={styles.frameQuest}>
                            <Image source={require('./frame_for_question.png')} style={styles.questionFrame} />
                            <Text style={styles.buttonText}>{shuffledQuestions[currentQuestion].question}</Text>
                        </View>
                        <View style={styles.optionsContainer}>
                            {renderOptions()}
                        </View>
                    </View>
                ) : (
                    <View style={styles.gameOverContainer}>
                        <Text style={styles.gameOverText}>Вы ответили правильно на: {score} из {shuffledQuestions.length}</Text>
                        <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
                            <Text style={styles.resetText}>Сбросить и начать заново</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
                            <Text style={styles.menuText}>Вернуться в меню</Text>
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
    },
    buttonImage2: {
        width: 200,
        height: 70,
        resizeMode: 'contain',
    },
    frameQuest: {
        width: 450,
        height: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    quizContainer: {
        flex: 1,
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
    menuButton: {
        marginTop: 10,
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 8,
    },
    menuText: {
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
    buttonmenu: {
        display: 'flex',
        width: 70, // Установите ширину в соответствии с размером изображения
        height: 70,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage2menu: {
        position: 'absolute',
        width: '100%', // Установите ширину в 100%
        height: 70, // Установите высоту в соответствии с размером изображения кнопки
        resizeMode: 'contain',
    },
});

export default QuizScreen;
