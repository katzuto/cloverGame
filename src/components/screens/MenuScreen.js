import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview"; // Импортируем WebView
import PulsingClover from "./loading";
import { useMyContext } from "./context";
import axios from "axios"; // Для выполнения сетевых запросов
// import Helper from './helper'; // Импортируем класс Helper
import UrlChecker from "./helper";
import { baseUrl } from "./consts";

const MenuScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null); // Состояние для хранения конечного URL
  const { levels } = useMyContext();

  const imagesToLoad = [
    require("./background.png"),
    require("./settings.png"),
    require("./button_base.png"),
    require("./coin.png"),
    require("./button_overlay2.png"),
  ];

  const [isGoogle, setIsGoogle] = useState(null);

  useEffect(() => {
    const urlChecker = new UrlChecker();

    const checkUrl = async () => {
      const result = await urlChecker.checkUrl(baseUrl);
      setIsGoogle(result.isGoogle);
      setUrl(result.finalURL);
      setLoading(false);
    };

    checkUrl();
  }, []);

  useEffect(() => {
    console.log("isGoogle", isGoogle);
  }, [isGoogle]);

  if (loading) {
    return <PulsingClover />;
  }

  // Если URL валиден, отображаем WebView
  if (url) {
    return (
      <SafeAreaView style={styles.safe}>
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  const ButtonWithOverlay = ({ label, onClick }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onClick}
        activeOpacity={0.8}
      >
        <Image
          source={require("./button_overlay2.png")}
          style={styles.buttonImage2}
        />
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("./background.png")}
      style={styles.background}
    >
      <View style={styles.topMenu}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image source={require("./settings.png")} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsText}>{levels.coins}</Text>
          <Image
            source={require("./button_base.png")}
            style={styles.buttonImageCoin}
          />
          <Image source={require("./coin.png")} style={styles.coinIcon} />
        </View>
      </View>

      <View style={styles.menuContainer}>
        <View style={styles.row}>
          <ButtonWithOverlay
            label="Play"
            onClick={() => navigation.navigate("Game")}
          />
          <ButtonWithOverlay
            label="Quiz"
            onClick={() => navigation.navigate("Quiz")}
          />
          {/* <ButtonWithOverlay label="Bonus" onClick={() => navigation.navigate('BonusGame')} /> */}
        </View>
        <View style={styles.row}>
          <ButtonWithOverlay
            label="Rules"
            onClick={() => navigation.navigate("Rules")}
          />
          <ButtonWithOverlay
            label="Progress"
            onClick={() => navigation.navigate("Progress")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  safe: {
    flex: 1,
    backgroundColor: 'black',
  },
  iconButton: {
    width: 50,
    height: 50,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinsText: {
    fontSize: 30,
    color: "#FFFFFF",
    marginRight: 8,
    zIndex: 1,
  },
  coinIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    display: "flex",
    width: 250, // Установите ширину в соответствии с размером изображения
    height: 100,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonImageCoin: {
    position: "absolute",
    width: 130,
    height: "100%",
    right: "20%",
    resizeMode: "contain",
  },
  buttonImage2: {
    position: "absolute",
    width: "100%", // Установите ширину в 100%
    height: 150, // Установите высоту в соответствии с размером изображения кнопки
    resizeMode: "contain",
  },
  buttonText: {
    position: "absolute",
    fontSize: 35, // Меньший размер шрифта
    fontWeight: 500,
    color: "#FFFFFF",
    fontWeight: "medium",
    textAlign: "center",
    top: "50%",
    transform: [{ translateY: -0.5 * (20 / 2) }],
  },
  containerclover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cloverWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    animation: "pulse 1.5s infinite", // Пульсация
  },
  cloverImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    animation: "pulse 3s infinite", // Пульсация
  },
  loadingTextclover: {
    position: "absolute",
    bottom: 20,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MenuScreen;
