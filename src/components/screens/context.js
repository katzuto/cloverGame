// src/context.js
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const MyContext = createContext();

// Экспортируем провайдер
export const MyProvider = ({ children }) => {
    const [levels, setLevels] = useState({
        bonusGame: 0,
        coins: 0, // Текущие монеты
        quiz: 0,
    });

    // Функция для увеличения уровня бонусной игры
    const incrementBonusGame = () => {
        setLevels(prevLevels => {
            const newBonusGame = Math.min(prevLevels.bonusGame + 1, 10);
            return {
                ...prevLevels,
                bonusGame: newBonusGame,
            };
        });
    };

    // Функция для увеличения уровня викторины
    const incrementQuiz = () => {
        setLevels(prevLevels => {
            const newQuiz = Math.min(prevLevels.quiz + 1, 1);
            return {
                ...prevLevels,
                quiz: newQuiz,
            };
        });
    };

    // Функция для обновления количества монет
    const updateCoins = (amount) => {
        setLevels(prevLevels => ({
            ...prevLevels,
            coins: prevLevels.coins + amount, // Увеличиваем общее количество монет
        }));
    };

    return (
        <MyContext.Provider value={{ levels, incrementBonusGame, incrementQuiz, updateCoins }}>
            {children}
        </MyContext.Provider>
    );
};

// Хук для использования контекста
export const useMyContext = () => {
    return useContext(MyContext);
};
