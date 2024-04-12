import AppState from "./AppState/AppState.js";
import { GridLengths } from "./consts/consts.js";
import gameOver from "./gameOver.js";
import generateNewLine from "./generateNewLine.js";

import { newLineArray, GridArray } from "./types/types.js";

const moveDown = (gridArray: GridArray): void => {
    if (AppState.gameOverState) return;

    if (AppState.checkBoxPositions.length) AppState.checkBoxPositions.forEach(position => position.y++);
    if (AppState.explodedBoxes.length) AppState.explodedBoxes.forEach(position => position.y++);

    const newArray: newLineArray = generateNewLine();
    gridArray.pop();
    gridArray.unshift(newArray);

    let lineBlank: boolean = gridArray[AppState.highestPositionY + 1].filter(box => box !== null).length ? true : false;

    if (lineBlank) AppState.highestPositionY++;
    if (AppState.highestPositionY + 1 === GridLengths.RowLength) gameOver();

    // console.clear();
    // console.table(gridArray);
}

export default moveDown;