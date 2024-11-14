import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Switch, StyleSheet, ImageBackground, Image } from 'react-native';
import CustomSwitch from './customSwitch';

const Settings = ({ navigation }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  const toggleSoundSwitch = () => {
    setIsSoundEnabled(previousState => !previousState);

  }
  const toggleMusicSwitch = () => setIsMusicEnabled(previousState => !previousState);

  return (
    <ImageBackground source={require('./background.png')} style={styles.background}>
      <View style={styles.container}>
        <ImageBackground source={require('./frame_for_settings.png')} style={styles.settingsFrame} >
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Image source={require('./close_icon.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.labelContainer}>
            {!isSoundEnabled ? (
              <Image source={require('./line_for_off_action.png')} style={styles.settingsImageOff} />
            ) : null}
            <Image source={require('./sound_Icon.png')} style={styles.settingsImage} />
            <CustomSwitch
              isEnabled={isSoundEnabled}
              onToggle={setIsSoundEnabled}
              baseImage={require('./switch_frame.png')}  // Укажите путь к изображению основания
              thumbImage={require('./switch_button.png')} // Укажите путь к изображению ползунка
            />
          </View>
          <View style={styles.labelContainer}>
            {!isMusicEnabled ? (
              <Image source={require('./line_for_off_action.png')} style={styles.settingsImageOff} />
            ) : null}
            <Image source={require('./music_icjn.png')} style={styles.settingsImage} />
            <CustomSwitch
              isEnabled={isMusicEnabled}
              onToggle={setIsMusicEnabled}
              baseImage={require('./switch_frame.png')}  // Укажите путь к изображению основания
              thumbImage={require('./switch_button.png')} // Укажите путь к изображению ползунка
            />
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    padding: 20,
  },
  label: {
    margin: 10,
    fontSize: 18,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  button: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginLeft: 10,
    position: 'absolute',
    right: -20,
    top: -20,
  },
  settingsFrame: {
    position: 'absolute',
    height: 300,
    width: 350,
    resizeMode: 'contain',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsImage: {
    width: 60,
    height: 60,
  },
  settingsImageOff: {
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 1,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 60,
  },
});

export default Settings;
