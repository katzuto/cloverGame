import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export const ButtonMenu = ({ navigation }) => {
  return (
        <TouchableOpacity
            style={styles.buttonmenu}
            onPress={() => navigation.goBack()} // измените с onClick на onPress для асинхронных операций
            activeOpacity={0.7} // уменьшите значение, если нужно быстрее реагировать
        >
            <Image source={require('./home_icon.png')} style={styles.buttonImage2menu} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonmenu: {
        display: 'flex',
        width: 70,
        height: 70,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        left: -250,
        top: 0,
        position: 'absolute',
    },
    buttonImage2menu: {
        position: 'absolute',
        width: '100%',
        height: 70,
        resizeMode: 'contain',
    },
});