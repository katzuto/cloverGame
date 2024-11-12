import { Image, ImageBackground, Text, StyleSheet } from "react-native";
const bonusImage = require('./BONUS_PLAY_ZASTAVKA.png');

export const BonusGame = () => {
    return (
        <ImageBackground source={bonusImage} style={styles.bonusContainer}>
            {items.map((item, index) => (
                <Image
                    key={index}
                    source={goldenCloverImage}
                    style={[styles.bonusItem, { left: item.x }]}
                    onTouchEnd={handleBonusClick}
                />
            ))}
            <Text style={styles.bonusScore}>Бонусный счет: {bonusScore}</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bonusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bonusImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bonusItem: {
        position: 'absolute',
        width: 50,
        height: 60,
    },
    bonusScore: {
        position: 'absolute',
        top: 50,
        right: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonmenu: {
        display: 'flex',
        width: 70, // Установите ширину в соответствии с размером изображения
        height: 70,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        position: 'absolute',
    },
    buttonImage2menu: {
        position: 'absolute',
        width: '100%', // Установите ширину в 100%
        height: 70, // Установите высоту в соответствии с размером изображения кнопки
        resizeMode: 'contain',
    },
});