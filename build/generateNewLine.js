import randomColor from './randomColor.js';
const generateNewLine = () => {
    const arr = Array.from(Array(10)).map(() => {
        const color = randomColor();
        return color.rgb;
    });
    return arr;
};
export default generateNewLine;
