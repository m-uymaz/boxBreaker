import { GridRowIndeces } from "./consts/consts.js";
import AppState from "./AppState/AppState.js";
import gameOver from "./gameOver.js";

// Throw box to the first null location
const throwBox = (): void => {
    for (let yIndex = AppState.highestPositionY; 0 <= yIndex; yIndex--) {
        // If you try to put a block on the last index line - Game Over
        if (yIndex === GridRowIndeces.NextToLast && AppState.gridArray[yIndex][AppState.arrowIndex] !== null) {
            gameOver();
            break;
        };

        if (yIndex === GridRowIndeces.First) {
            if (AppState.gridArray[yIndex][AppState.arrowIndex] === null) {
                AppState.gridArray[yIndex][AppState.arrowIndex] = AppState.coughtBox;
                AppState.thrownBox = { y: 0, x: AppState.arrowIndex }
            } else {
                AppState.gridArray[yIndex + 1][AppState.arrowIndex] = AppState.coughtBox;
                AppState.thrownBox = { y: 1, x: AppState.arrowIndex }
            }
            AppState.coughtBox = null;
        }
        if (AppState.gridArray[yIndex][AppState.arrowIndex] === null) continue;

        if (yIndex !== GridRowIndeces.First) {
            //Put the box on the next Y index
            let upperGridIndex: number = yIndex + 1;
            AppState.gridArray[upperGridIndex][AppState.arrowIndex] = AppState.coughtBox;

            AppState.thrownBox = { y: yIndex + 1, x: AppState.arrowIndex }
            AppState.coughtBox = null;
        }

        //Find when the box is put, if it creates a new hight
        if (yIndex >= AppState.highestPositionY) AppState.highestPositionY++;

        if (AppState.thrownBox) {
            AppState.checkBoxPositions = [{ y: AppState.thrownBox.y, x: AppState.thrownBox.x }];
            AppState.coughtBoxFrom = null;
        }
        break;
    }
}

export default throwBox;

