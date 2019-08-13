
import { Dimensions } from 'react-native'
const UIWIDTH = 750
const { width } = Dimensions.get('window');

export default (UIPX) => {
    return Math.round(UIPX * width / UIWIDTH);
}