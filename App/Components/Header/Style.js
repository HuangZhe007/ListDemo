import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors, Fonts, Px } from '../../Themes'


const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0
export default StyleSheet.create({
    statusBarStyle: { paddingTop: statusBarHeight },
    headerStyle: {
        height: Px(88),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Px(33),
    },
    titleStyle: {
        fontSize: Fonts.size.m,
        color: Colors.subsidiary_black,
        fontWeight: '500'
    },
    leftStyle: { flex: 1, flexDirection: 'row' },
    rightStyle: { flex: 1, flexDirection: 'row-reverse' }
})