import { generateInitialGrid, GridArray } from "../gridArray.js";
import { ExplodedBoxes } from "../types/types.js";

// Initial app state
type AppStateInterface = {
    gridArray: GridArray;
    timeouts: {
        explodeTimeout: number | null;
        rerenderTimeout: number | null;
    }
    checkBoxPositions: ExplodedBoxes;
    explodedBoxes: ExplodedBoxes;
    highestPositionY: number;
    arrowIndex: number;
    coughtBox: string | null;
    coughtBoxFrom: { y: number, x: number } | null;
    thrownBox: { x: number, y: number } | null;
    gameOverState: boolean;
    fall: boolean;
    interval: number | null;
    countMilliseconds: number;
}

const AppState: AppStateInterface = {
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
}

export default AppState;