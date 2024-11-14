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
    const [isCustomSwitchEnabled, setIsCustomSwitchEnabled] = useState(false); // Новое состояние
    const [isCustomSwitchEnabledSounds, setIsCustomSwitchEnabledSounds] = useState(true); // Новое состояние

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
            const newQuiz = Math.min(prevLevels.quiz + 1, 10); // Исправлено на 10
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
            coins: prevLevels.coins + amount,
        }));
    };

    // Функция для обновления состояния переключателя
    const updateCustomSwitch = (value) => {
        setIsCustomSwitchEnabled(value);
    };


    const updateCustomSwitchSounds = (value) => {
        setIsCustomSwitchEnabledSounds(value);
    };

    

    return (
        <MyContext.Provider value={{ 
            levels, 
            incrementBonusGame, 
            incrementQuiz, 
            updateCoins, 
            isCustomSwitchEnabled, 
            updateCustomSwitch, 
            updateCustomSwitchSounds,
            setIsCustomSwitchEnabledSounds,
            isCustomSwitchEnabledSounds
        }}>
            {children}
        </MyContext.Provider>
    );
};

// Хук для использования контекста
export const useMyContext = () => {
    return useContext(MyContext);
};
