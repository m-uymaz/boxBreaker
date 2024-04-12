import AppState from "./AppState/AppState.js";
import { GridLengths, ARROW, LAST_ROW_N_START, ALICEBLUE, KeyboardInputs, GRID_BOXES_SIZE } from "./consts/consts.js";
import boxPositionN from "./boxPositionN.js";
// Renders starting grid
const initialRender = () => {
    const playground = document.querySelector('#playground');
    for (let y = 0; y < GridLengths.RowLength; y++) {
        for (let x = 0; x < GridLengths.ColumsLength; x++) {
            const isBoxOnArrowYAxis = x === AppState.arrowIndex;
            const gridBox = document.createElement('div');
            gridBox.style.backgroundColor = AppState.gridArray[y][x] || '';
            if (isBoxOnArrowYAxis) {
                gridBox.classList.add('box-selected');
                if (AppState.gridArray[y][x] === ARROW)
                    gridBox.classList.add('arrow');
            }
            else {
                gridBox.classList.add('box');
            }
            playground === null || playground === void 0 ? void 0 : playground.appendChild(gridBox);
        }
    }
};
// Rerenders the whole grid
const rerenderGrid = () => {
    let gridBoxN = 0;
    for (let y = 0; y <= GridLengths.RowLength; y++) {
        for (let x = 0; x < GridLengths.ColumsLength; x++) {
            gridBoxN++;
            const isBoxOnArrowAxis = x === AppState.arrowIndex;
            const isBoxOnLastRow = gridBoxN > LAST_ROW_N_START;
            const gridBox = document.querySelector(`#playground div:nth-child(${gridBoxN})`);
            if (gridBox) {
                if (gridBox.style.backgroundColor !== AppState.gridArray[y][x]) {
                    gridBox.style.backgroundColor = AppState.gridArray[y][x] || '';
                }
                gridBox.classList.remove(...gridBox.classList);
                if (isBoxOnArrowAxis) {
                    gridBox.classList.add('box-selected');
                    if (isBoxOnLastRow) {
                        gridBox.classList.add('arrow');
                        gridBox.style.backgroundColor = AppState.coughtBox || '';
                    }
                    ;
                }
                else
                    gridBox.classList.add('box');
            }
        }
    }
};
// Renders only the thrown box
const rerenderThrowBox = () => {
    if (AppState.thrownBox) {
        const gridBoxN = boxPositionN(AppState.thrownBox.y, AppState.thrownBox.x);
        const gridBox = document.querySelector(`#playground div:nth-child(${gridBoxN})`);
        if (gridBox) {
            gridBox.style.backgroundColor = AppState.gridArray[AppState.thrownBox.y][AppState.thrownBox.x] || '';
        }
        const arrowBoxN = LAST_ROW_N_START + (AppState.thrownBox.x + 1);
        const arrowBox = document.querySelector(`#playground div:nth-child(${arrowBoxN})`);
        if (arrowBox) {
            arrowBox.style.backgroundColor = ALICEBLUE;
        }
    }
};
// Renders only exploding boxes
const renderExplotions = (position) => {
    const gridBoxN = boxPositionN(position.y, position.x);
    const gridBox = document.querySelector(`#playground div:nth-child(${gridBoxN})`);
    gridBox === null || gridBox === void 0 ? void 0 : gridBox.classList.remove('soon-to-explode');
    gridBox === null || gridBox === void 0 ? void 0 : gridBox.classList.add('box-explotion');
};
const renderBlinking = (position) => {
    const gridBoxN = boxPositionN(position.y, position.x);
    const gridBox = document.querySelector(`#playground div:nth-child(${gridBoxN})`);
    gridBox === null || gridBox === void 0 ? void 0 : gridBox.classList.remove('box-explotion');
    gridBox === null || gridBox === void 0 ? void 0 : gridBox.classList.add('soon-to-explode');
};
// Renders only the arrow and it's shadow
const renderArrow = (direction) => {
    console.clear();
    for (let gridBoxN = AppState.arrowIndex + 1; gridBoxN <= GRID_BOXES_SIZE; gridBoxN += 10) {
        const prevGridBoxN = direction === KeyboardInputs.ArrowRight ? gridBoxN - 1 : gridBoxN + 1;
        const arrowBox = document.querySelector(`#playground div:nth-child(${gridBoxN})`);
        const prevGridBox = document.querySelector(`#playground div:nth-child(${prevGridBoxN})`);
        arrowBox === null || arrowBox === void 0 ? void 0 : arrowBox.classList.remove('box-selected', 'arrow', 'box');
        if (gridBoxN > LAST_ROW_N_START && arrowBox && prevGridBox) {
            arrowBox === null || arrowBox === void 0 ? void 0 : arrowBox.classList.add('box-selected', 'arrow');
            arrowBox.style.backgroundColor = AppState.coughtBox || '';
            prevGridBox.style.backgroundColor = ALICEBLUE;
        }
        else
            arrowBox === null || arrowBox === void 0 ? void 0 : arrowBox.classList.add('box-selected');
        prevGridBox === null || prevGridBox === void 0 ? void 0 : prevGridBox.classList.remove('box-selected', 'arrow', 'box');
        prevGridBox === null || prevGridBox === void 0 ? void 0 : prevGridBox.classList.add('box');
    }
};
// Renders only the cough box
const rerenderCatchBox = () => {
    if (AppState.coughtBoxFrom) {
        const oldBoxN = boxPositionN(AppState.coughtBoxFrom.y, AppState.coughtBoxFrom.x);
        const oldBoxGrid = document.querySelector(`#playground div:nth-child(${oldBoxN})`);
        if (oldBoxGrid)
            oldBoxGrid.style.backgroundColor = ALICEBLUE;
        const arrowBoxN = LAST_ROW_N_START + (AppState.arrowIndex + 1);
        const arrowBox = document.querySelector(`#playground div:nth-child(${arrowBoxN})`);
        if (arrowBox)
            arrowBox.style.backgroundColor = AppState.coughtBox || '';
    }
};
export { initialRender, rerenderGrid, renderExplotions, rerenderThrowBox, renderArrow, rerenderCatchBox, renderBlinking };
