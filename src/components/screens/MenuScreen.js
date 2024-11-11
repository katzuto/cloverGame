import React, { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const imagesToLoad = [
    require('./background.png'),
    require('./settings.png'),
    require('./button_base.png'),
    require('./coin.png'),
    require('./button_overlay2.png'),
  ];

  useEffect(() => {
    const loadImages = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('./background.png')}
      style={styles.background}
    >
      <View style={styles.topMenu}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('./settings.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>20K</Text>
          <Image source={require('./button_base.png')} style={styles.buttonImageCoin} />
          <Image source={require('./coin.png')} style={styles.coinIcon} />
        </View>
      </View>

      <View style={styles.menuContainer}>
        <View style={styles.row}>
          <ButtonWithOverlay label="PLAY" onClick={() => navigation.navigate('Game')} />
          <ButtonWithOverlay label="QUIZ" onClick={() => navigation.navigate('Quiz')} />
        </View>
        <View style={styles.row}>
          <ButtonWithOverlay label="RULES" />
          <ButtonWithOverlay label="PROGRESS" />
        </View>
      </View>
    </ImageBackground>
  );
};

const ButtonWithOverlay = ({ label, onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick} activeOpacity={0.8}>
      <Image source={require('./button_overlay2.png')} style={styles.buttonImage2} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  iconButton: {
    width: 50,
    height: 50,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinsText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginRight: 8,
    zIndex: 1,
  },
  coinIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    width: 150, // Установите ширину в соответствии с размером изображения
    height: 50, 
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonImageCoin: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: "20%",
    resizeMode: 'contain',
  },
  buttonImage2: {
    position: 'absolute',
    width: '100%', // Установите ширину в 100%
    height: 150, // Установите высоту в соответствии с размером изображения кнопки
    resizeMode: 'contain',
  },
  buttonText: {
    position: 'absolute',
    fontSize: 20, // Меньший размер шрифта
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    top: '50%',
    transform: [{ translateY: -0.5 * (20 / 2) }],
  },
});

export default MenuScreen;
