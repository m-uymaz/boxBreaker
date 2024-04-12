import { generateInitialGrid } from "../gridArray.js";
const AppState = {
    gridArray: generateInitialGrid(),
    timeouts: {
        explodeTimeout: null,
        rerenderTimeout: null,
    },
    checkBoxPositions: [],
    explodedBoxes: [],
    highestPositionY: 1,
    arrowIndex: 5,
    coughtBox: null,
    coughtBoxFrom: null,
    thrownBox: null,
    gameOverState: false,
    fall: false,
    interval: null,
    countMilliseconds: 0
};
export default AppState;
