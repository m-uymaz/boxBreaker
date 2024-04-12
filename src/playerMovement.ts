import AppState from './AppState/AppState.js';
import { ARROW, KeyboardInputs, GridRowIndeces, GridColumsIndeces } from './consts/consts.js';
import { GridArray } from './types/types.js';

const moveArrow = (gridArray: GridArray, direction: string): void => {
    if (
        direction === KeyboardInputs.ArrowLeft && AppState.arrowIndex === GridColumsIndeces.First
        ||
        direction === KeyboardInputs.ArrowRight && AppState.arrowIndex === GridColumsIndeces.Last
    ) return;

    gridArray[GridRowIndeces.Last][AppState.arrowIndex] = null;

    direction === KeyboardInputs.ArrowRight ? AppState.arrowIndex++ : AppState.arrowIndex--;
    gridArray[GridRowIndeces.Last][AppState.arrowIndex] = ARROW;

    // console.clear();
    // console.table(gridArray);
}

export default moveArrow;