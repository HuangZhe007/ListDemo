import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts, Px } from '../Themes'
export default StyleSheet.create({
    Box: {
        flex: 1,
        paddingLeft: Px(8),
        backgroundColor: Colors.subsidiary_white,
    },
    SectionBox: {
        height: Px(87),
        paddingLeft: Px(17),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.subsidiary_white,
    },
    SectionText: {
        fontSize: Fonts.size.s,
        color: Colors.subsidiary_text
    },
    ItemBox: {
        height: Px(80),
        paddingLeft: Px(17),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    ItemTetx: {
        fontSize: Fonts.size.s,
        color: Colors.subsidiary_black
    },
    border: {
        height: 1,
        left: Px(18),
        right: Px(26),
        bottom: 0,
        position: 'absolute',
        backgroundColor: Colors.border
    },
    FlatBox: {
        marginLeft: Px(4)
    },
    flatItemBox: {
        borderRadius: Px(5),
        marginLeft: Px(14),
        marginBottom: Px(14),
        width: Px(210),
        height: Px(62),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    LocatingBox: {
        flexDirection: 'row',
        backgroundColor: Colors.Subject,
    },
    ImageStyles: {
        height: Px(26),
        width: Px(21),
        marginRight: Px(8)
    },
    showHeaderStyle: {
        color: Colors.subsidiary_black
    },
    showHeaderBoxStyle: {
        backgroundColor: '#FFAB24',
        borderRadius: Px(6)
    }
})
