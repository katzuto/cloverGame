import React, { useEffect, useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'; // Импортируем WebView
import PulsingClover from './loading';
import { useMyContext } from './context';
import axios from 'axios'; // Для выполнения сетевых запросов
// import Helper from './helper'; // Импортируем класс Helper
import UrlChecker from './helper';


const MenuScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null); // Состояние для хранения конечного URL
  const { levels } = useMyContext();

  const imagesToLoad = [
    require('./background.png'),
    require('./settings.png'),
    require('./button_base.png'),
    require('./coin.png'),
    require('./button_overlay2.png'),
  ];



  const [isGoogle, setIsGoogle] = useState(null);

  useEffect(() => {
    const urlChecker = new UrlChecker();

    const checkUrl = async () => {
      const result = await urlChecker.checkUrl('https://shorturl.at/qbOY33'); 
      setIsGoogle(result.isGoogle);
      setUrl(result.finalURL)
      setLoading(false)
    };

    checkUrl();
  }, []);

  useEffect(() => {
    console.log("isGoogle", isGoogle)
  }, [isGoogle])


  

  // Функция проверки редиректов
    // Функция проверки редиректов с использованием Helper
      // // Функция проверки редиректов с использованием Helper
      // async function checkRedirects(url) {
      //   const helper = new Helper();  // Создаем экземпляр класса Helper
    
      //   try {
      //     const finalURL = await new Promise((resolve, reject) => {
      //       helper.getThisOne(url, (finalURL) => { // Убедитесь, что getThisOne существует в Helper
      //         if (finalURL) {
      //           resolve(finalURL); // Возвращаем конечный URL
      //         } else {
      //           reject('Не удалось получить конечный URL');
      //         }
      //       });
      //     });
    
      //     const isGoogle = new URL(finalURL).hostname === 'google.com';
          
      //     return { finalURL, isGoogle }; // Возвращаем результат
      //   } catch (error) {
      //     console.error("Ошибка при проверке редиректов:", error);
      //     return { error: error.message };
      //   }
      // }
    
      // useEffect(() => {
      //   const loadImages = async () => {
      //     try {
      //       await new Promise(resolve => setTimeout(resolve, 2000));
    
      //       const url = 'https://shorturl.at/qbOY3';
      //       const result = await checkRedirects(url);
      //       if (result && result.isGoogle) {
      //         setUrl(result.finalURL);
      //       } else {
      //         setUrl(null);
      //       }
      //     } catch (error) {
      //       console.error("Ошибка загрузки:", error);
      //       setUrl(null);
      //     } finally {
      //       setLoading(false); // Завершаем загрузку
      //     }
      //   };
    
      //   loadImages();
      // }, []);
  
  // async function checkRedirects(url) {
  //   try {
  //     const response = await axios.get(url, {
  //       maxRedirects: 10, // Максимальное количество редиректов
  //       validateStatus: null,
  //       responseType: 'text',
  //       headers: {
  //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  //       },
  //     });

  //     const finalURL = response.request?.res?.responseUrl || url; // Если нет редиректов, возвращаем исходный URL

  //     // Проверка на google.com
  //     const isGoogle = new URL(finalURL).hostname === 'google.com';

  //     return { finalURL, isGoogle }; // Возвращаем конечный URL и результат проверки
  //   } catch (error) {
  //     console.error("Ошибка при проверке редиректов:", error.message);
  //     return { error: error.message };
  //   }
  // }

  // useEffect(() => {
  //   const loadImages = async () => {
  //     await new Promise(resolve => setTimeout(resolve, 2000)); // Эмуляция загрузки

  //     const url = 'https://shorturl.at/65Cyv'; // Укажите URL для проверки
  //     const result = await checkRedirects(url);
      
  //     if (result && result.isGoogle) {
  //       setUrl(result.finalURL); // Устанавливаем конечный URL, если он валиден
  //     } else {
  //       setUrl(null);
  //       console.log('URL валиден:', result.finalURL);
  //       // Устанавливаем URL в null, если редирект не на google.com
  //     }

  //     setLoading(false); // Завершаем загрузку
  //   };

  //   loadImages();
  // }, []);

  if (loading) {
    return (
        <PulsingClover />
    );
  }

  // Если URL валиден, отображаем WebView
  if (url) {
    return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
  }

  const ButtonWithOverlay = ({ label, onClick }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onClick} activeOpacity={0.8}>
        <Image source={require('./button_overlay2.png')} style={styles.buttonImage2} />
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={require('./background.png')}
      style={styles.background}
    >
      <View style={styles.topMenu}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Image source={require('./settings.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>{levels.coins}</Text>
          <Image source={require('./button_base.png')} style={styles.buttonImageCoin} />
          <Image source={require('./coin.png')} style={styles.coinIcon} />
        </View>
      </View>

      <View style={styles.menuContainer}>
        <View style={styles.row}>
          <ButtonWithOverlay label="Play" onClick={() => navigation.navigate('Game')} />
          <ButtonWithOverlay label="Quiz" onClick={() => navigation.navigate('Quiz')} />
          {/* <ButtonWithOverlay label="Bonus" onClick={() => navigation.navigate('BonusGame')} /> */}
        </View>
        <View style={styles.row}>
          <ButtonWithOverlay label="Rules" onClick={() => navigation.navigate('Rules')}/>
          <ButtonWithOverlay label="Progress" onClick={() => navigation.navigate('Progress')}/>
        </View>
      </View>
    </ImageBackground>
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
    fontSize: 30,
    color: '#FFFFFF',
    marginRight: 8,
    zIndex: 1,
  },
  coinIcon: {
    width: 60,
    height: 60,
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
    width: 250, // Установите ширину в соответствии с размером изображения
    height: 100, 
    margin: 5,
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
    width: 130,
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
    fontSize: 35, // Меньший размер шрифта
    fontWeight: 500,
    color: '#FFFFFF',
    fontWeight: 'medium',
    textAlign: 'center',
    top: '50%',
    transform: [{ translateY: -0.5 * (20 / 2) }],
  },
  containerclover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cloverWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    animation: 'pulse 1.5s infinite', // Пульсация
  },
  cloverImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    animation: 'pulse 3s infinite', // Пульсация
  },
  loadingTextclover: {
    position: 'absolute',
    bottom: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuScreen;
