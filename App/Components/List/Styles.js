import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'
export default StyleSheet.create({
    Box: {
        flex: 1,
    },
    flatBox: {
        position: 'absolute',
        right: 5,
    },
    indexText: {
        color: Colors.indexColor
    },
    TextBox: {
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
