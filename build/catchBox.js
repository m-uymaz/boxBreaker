import AppState from "./AppState/AppState.js";
import { GridRowIndeces, BLINKING } from "./consts/consts.js";
// Catch the first available box
const catchBox = () => {
    for (let y = GridRowIndeces.NextToLast; 0 <= y; y--) {
        if (AppState.gridArray[y][AppState.arrowIndex] === BLINKING)
            break;
        if (AppState.gridArray[y][AppState.arrowIndex] === null) {
            continue;
        }
        else {
            AppState.coughtBox = AppState.gridArray[y][AppState.arrowIndex];
            AppState.gridArray[y][AppState.arrowIndex] = null;
            AppState.coughtBoxFrom = { y: y, x: AppState.arrowIndex };
            break;
        }
    }
    // console.clear();
    // console.table(gridArray);
};
export default catchBox;
