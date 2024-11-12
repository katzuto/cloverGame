import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const Settings = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  const toggleSoundSwitch = () => setIsSoundEnabled(previousState => !previousState);
  const toggleMusicSwitch = () => setIsMusicEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Звук: {isSoundEnabled ? 'Включен' : 'Выключен'}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isSoundEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSoundSwitch}
        value={isSoundEnabled}
      />
      
      <Text style={styles.label}>Музыка: {isMusicEnabled ? 'Включена' : 'Выключена'}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isMusicEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleMusicSwitch}
        value={isMusicEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    margin: 10,
    fontSize: 18,
  },
});

export default Settings;
