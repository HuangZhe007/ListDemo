import { PixelRatio } from 'react-native';
const pixelSize = (function () {
    let pixelRatio = PixelRatio.get();
    if (pixelRatio >= 3) return 0.333;
    else if (pixelRatio >= 2) return 0.5;
    else return 1;
})();

const height = {
    pixelSize
}
export default height
