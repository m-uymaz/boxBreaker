import AppState from "./AppState/AppState.js";
import { GridLengths, BLINKING } from "./consts/consts.js";
function floodFill(gridArray, position) {
    const copyGrid = JSON.parse(JSON.stringify(gridArray));
    const current = gridArray[position.y][position.x];
    const explodedBoxes = [];
    fill(copyGrid, position.y, position.x, current, explodedBoxes);
    if (explodedBoxes.length > 2) {
        explodedBoxes.sort((a, b) => a.y - b.y);
        explodedBoxes.forEach((explodedBox) => {
            AppState.gridArray[explodedBox.y][explodedBox.x] = BLINKING;
            AppState.checkBoxPositions.push({ y: explodedBox.y, x: explodedBox.x });
            AppState.explodedBoxes.push({ y: explodedBox.y, x: explodedBox.x });
        });
    }
}
;
function fill(copyGrid, y, x, current, explodedBoxes) {
    // If row is less than 0 - bottom case
    if (y < 0)
        return;
    // If column is less than 0 - bottom case
    if (x < 0)
        return;
    // If row is greater than copyGrid length - bottom case
    if (y > GridLengths.RowLength - 1)
        return;
    // If column is greater than copyGrid length - bottom case
    if (x > GridLengths.ColumsLength - 1)
        return;
    // If this position does not equal the color or is null - bottom case
    if (copyGrid[y][x] !== current || copyGrid[y][x] === null)
        return;
    copyGrid[y][x] = null;
    explodedBoxes.push({ y: y, x: x });
    // Fill in all four directions
    // Fill Prev row
    fill(copyGrid, y - 1, x, current, explodedBoxes);
    // Fill next row
    fill(copyGrid, y + 1, x, current, explodedBoxes);
    // Fill prev col
    fill(copyGrid, y, x - 1, current, explodedBoxes);
    // Fill next col
    fill(copyGrid, y, x + 1, current, explodedBoxes);
}
// After flood fill destroys boxes, fill the null spaces with boxes above (if there are any)
function fillEmptyGridSpaces() {
    const changedBoxes = [];
    AppState.explodedBoxes.forEach(position => {
        AppState.gridArray[position.y][position.x] = null;
    });
    for (let x = 0; x < GridLengths.ColumsLength; x++) {
        for (let y = 0; y < GridLengths.RowLength - 2; y++) {
            if (AppState.gridArray[y][x] === null) {
                let nextNonNull = y + 1;
                while (nextNonNull < GridLengths.RowLength && AppState.gridArray[nextNonNull][x] === null) {
                    nextNonNull++;
                }
                if (nextNonNull < GridLengths.RowLength - 1) {
                    AppState.gridArray[y][x] = AppState.gridArray[nextNonNull][x];
                    AppState.gridArray[nextNonNull][x] = null;
                    changedBoxes.push({ y: y, x: x });
                }
            }
        }
    }
    AppState.explodedBoxes = [];
    changedBoxes.sort((a, b) => a.y - b.y);
    return changedBoxes.forEach((position) => {
        AppState.checkBoxPositions.push(position);
    });
}
export { floodFill, fill, fillEmptyGridSpaces };
