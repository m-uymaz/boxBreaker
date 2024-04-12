import AppState from "./AppState/AppState.js";
import { GridLengths, ARROW, LAST_ROW_N_START, ALICEBLUE, KeyboardInputs, GRID_BOXES_SIZE } from "./consts/consts.js";
import { DivElement } from "./types/types.js";
import boxPositionN from "./boxPositionN.js";

// Renders starting grid
const initialRender = (): void => {
    const playground: DivElement = document.querySelector('#playground');

    for (let y = 0; y < GridLengths.RowLength; y++) {
        for (let x = 0; x < GridLengths.ColumsLength; x++) {
            const isBoxOnArrowYAxis: boolean = x === AppState.arrowIndex;
            const gridBox: DivElement = document.createElement('div');

            gridBox.style.backgroundColor = AppState.gridArray[y][x] || '';

            if (isBoxOnArrowYAxis) {
                gridBox.classList.add('box-selected');
                if (AppState.gridArray[y][x] === ARROW) gridBox.classList.add('arrow');

            } else {
                gridBox.classList.add('box');
            }

            playground?.appendChild(gridBox);
        }
    }
}

// Rerenders the whole grid
const rerenderGrid = (): void => {
    let gridBoxN: number = 0;
    for (let y = 0; y <= GridLengths.RowLength; y++) {
        for (let x = 0; x < GridLengths.ColumsLength; x++) {
            gridBoxN++;

            const isBoxOnArrowAxis: boolean = x === AppState.arrowIndex;
            const isBoxOnLastRow: boolean = gridBoxN > LAST_ROW_N_START;

            const gridBox: DivElement = document.querySelector(`#playground div:nth-child(${gridBoxN})`);

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
                    };

                } else gridBox.classList.add('box');
            }
        }
    }
}

// Renders only the thrown box
const rerenderThrowBox = (): void => {
    if (AppState.thrownBox) {
        const gridBoxN: number = boxPositionN(AppState.thrownBox.y, AppState.thrownBox.x);

        const gridBox: DivElement = document.querySelector(`#playground div:nth-child(${gridBoxN})`);

        if (gridBox) {
            gridBox.style.backgroundColor = AppState.gridArray[AppState.thrownBox.y][AppState.thrownBox.x] || '';
        }

        const arrowBoxN: number = LAST_ROW_N_START + (AppState.thrownBox.x + 1);

        const arrowBox: DivElement = document.querySelector(`#playground div:nth-child(${arrowBoxN})`);
        if (arrowBox) {
            arrowBox.style.backgroundColor = ALICEBLUE;
        }
    }
}

// Renders only exploding boxes
const renderExplotions = (position: { y: number, x: number }): void => {
    const gridBoxN: number = boxPositionN(position.y, position.x);
    const gridBox: DivElement = document.querySelector(`#playground div:nth-child(${gridBoxN})`);

    gridBox?.classList.remove('soon-to-explode');
    gridBox?.classList.add('box-explotion');
}

const renderBlinking = (position: { y: number, x: number }): void => {
    const gridBoxN: number = boxPositionN(position.y, position.x);
    const gridBox: DivElement = document.querySelector(`#playground div:nth-child(${gridBoxN})`);

    gridBox?.classList.remove('box-explotion');
    gridBox?.classList.add('soon-to-explode');
}

// Renders only the arrow and it's shadow
const renderArrow = (direction: KeyboardInputs): void => {
    console.clear();

    for (let gridBoxN = AppState.arrowIndex + 1; gridBoxN <= GRID_BOXES_SIZE; gridBoxN += 10) {
        const prevGridBoxN: number = direction === KeyboardInputs.ArrowRight ? gridBoxN - 1 : gridBoxN + 1;

        const arrowBox: DivElement = document.querySelector(`#playground div:nth-child(${gridBoxN})`);
        const prevGridBox: DivElement = document.querySelector(`#playground div:nth-child(${prevGridBoxN})`);

        arrowBox?.classList.remove('box-selected', 'arrow', 'box');
        if (gridBoxN > LAST_ROW_N_START && arrowBox && prevGridBox) {
            arrowBox?.classList.add('box-selected', 'arrow');
            arrowBox.style.backgroundColor = AppState.coughtBox || '';

            prevGridBox.style.backgroundColor = ALICEBLUE;
        } else arrowBox?.classList.add('box-selected');

        prevGridBox?.classList.remove('box-selected', 'arrow', 'box');
        prevGridBox?.classList.add('box');
    }
}

// Renders only the cough box
const rerenderCatchBox = (): void => {
    if (AppState.coughtBoxFrom) {
        const oldBoxN: number = boxPositionN(AppState.coughtBoxFrom.y, AppState.coughtBoxFrom.x);
        const oldBoxGrid: DivElement = document.querySelector(`#playground div:nth-child(${oldBoxN})`);

        if (oldBoxGrid) oldBoxGrid.style.backgroundColor = ALICEBLUE;

        const arrowBoxN: number = LAST_ROW_N_START + (AppState.arrowIndex + 1);
        const arrowBox: DivElement = document.querySelector(`#playground div:nth-child(${arrowBoxN})`);

        if (arrowBox) arrowBox.style.backgroundColor = AppState.coughtBox || '';
    }
}

export {
    initialRender,
    rerenderGrid,
    renderExplotions,
    rerenderThrowBox,
    renderArrow,
    rerenderCatchBox,
    renderBlinking
};