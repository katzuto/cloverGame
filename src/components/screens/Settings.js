import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Switch, StyleSheet, ImageBackground, Image } from 'react-native';
import CustomSwitch from './customSwitch';
import CustomSwitchSecond from './customSwitchSecond';
import { useMyContext } from './context'; 

const Settings = ({ navigation }) => {
  const [value, setValue] = useState(false)
  const { 
    isCustomSwitchEnabled: isSoundEnabled, 
    updateCustomSwitch: setIsSoundEnabled 
  } = useMyContext(); 

  const { 
    isCustomSwitchEnabledSounds: isSoundEnabledSounds, 
    updateCustomSwitchSounds: setIsSoundEnabledSounds
  } = useMyContext(); 

  

  const toggleSoundSwitch = () => {
    console.log("isSoundEnabled", isSoundEnabled)
    setIsSoundEnabled(!isSoundEnabled);
  };

  const toggleSoundSwitchSounds = () => {
    console.log("isSoundEnabledSounds", isSoundEnabledSounds)
    setIsSoundEnabledSounds(!isSoundEnabledSounds);
  };


  return (
    <ImageBackground source={require('./background.png')} style={styles.background}>
      <View style={styles.container}>
        <ImageBackground source={require('./frame_for_settings.png')} style={styles.settingsFrame} >
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Image source={require('./close_icon.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.labelContainer}>
            {/* {!isSoundEnabled ? (
              <Image source={require('./line_for_off_action.png')} style={styles.settingsImageOff} />
            ) : null} */}
            <Image source={require('./sound_Icon.png')} style={styles.settingsImage} />
            <CustomSwitch
              isEnabled={isSoundEnabled}
              onToggle={toggleSoundSwitch}
              baseImage={require('./switch_frame.png')}  // Укажите путь к изображению основания
              thumbImage={require('./switch_button.png')} // Укажите путь к изображению ползунка
            />
          </View>
          <View style={styles.labelContainer}>
            {/* {value ? (
              <Image source={require('./line_for_off_action.png')} style={styles.settingsImageOff} />
            ) : null} */}
            <Image source={require('./music_icjn.png')} style={styles.settingsImage} />
            <CustomSwitchSecond 
              isEnabled={isSoundEnabledSounds}
              onToggle={toggleSoundSwitchSounds}
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
