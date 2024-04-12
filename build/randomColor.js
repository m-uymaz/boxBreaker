import { BoxColors } from './consts/consts.js';
const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(BoxColors).length);
    const colorName = Object.keys(BoxColors)[randomIndex];
    const rgb = Object.values(BoxColors)[randomIndex];
    return { color: colorName, rgb: rgb, index: randomIndex };
};
export default randomColor;
