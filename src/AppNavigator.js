import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './components/screens/MenuScreen';
import GameScreen from './components/screens/GameScreen';
import QuizScreen from './components/screens/QuizGame';
import Settings from './components/screens/Settings';
import BonusGame from './components/screens/BonusGame';
import Rules from './components/screens/Rules';
import LevelComponent from './components/screens/ProgressScreen';
import ScoreScreen from './components/screens/ScoreScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BonusGame"
          component={BonusGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rules"
          component={Rules}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Progress"
          component={LevelComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
                    name="Score"
                    component={ScoreScreen} // Добавляем экран результатов сюда
                    options={{ headerShown: false }}
                />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;