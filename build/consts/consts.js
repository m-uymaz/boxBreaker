const ARROW = 'X';
const ALICEBLUE = 'aliceblue';
const BLINKING = 'blinking';
var KeyboardInputs;
(function (KeyboardInputs) {
    KeyboardInputs["ArrowLeft"] = "ArrowLeft";
    KeyboardInputs["ArrowRight"] = "ArrowRight";
    KeyboardInputs["Space"] = "Space";
})(KeyboardInputs || (KeyboardInputs = {}));
const GRID_BOXES_SIZE = 200;
const LAST_ROW_N_START = 190;
var GridLengths;
(function (GridLengths) {
    GridLengths[GridLengths["RowLength"] = 20] = "RowLength";
    GridLengths[GridLengths["ColumsLength"] = 10] = "ColumsLength";
})(GridLengths || (GridLengths = {}));
var GridColumsIndeces;
(function (GridColumsIndeces) {
    GridColumsIndeces[GridColumsIndeces["First"] = 0] = "First";
    GridColumsIndeces[GridColumsIndeces["Last"] = 9] = "Last";
})(GridColumsIndeces || (GridColumsIndeces = {}));
var GridRowIndeces;
(function (GridRowIndeces) {
    GridRowIndeces[GridRowIndeces["First"] = 0] = "First";
    GridRowIndeces[GridRowIndeces["NextToLast"] = 18] = "NextToLast";
    GridRowIndeces[GridRowIndeces["Last"] = 19] = "Last";
})(GridRowIndeces || (GridRowIndeces = {}));
var BoxColors;
(function (BoxColors) {
    BoxColors["red"] = "rgb(245, 66, 66)";
    BoxColors["green"] = "rgb(66, 245, 85)";
    BoxColors["blue"] = "rgb(66, 90, 245)";
    BoxColors["purple"] = "rgb(245, 70, 225)";
    BoxColors["yellow"] = "rgb(245, 240, 70)";
    BoxColors["orange"] = "rgb(255, 172, 28)";
})(BoxColors || (BoxColors = {}));
export { BoxColors, GridLengths, GridRowIndeces, KeyboardInputs, GridColumsIndeces, ALICEBLUE, ARROW, GRID_BOXES_SIZE, LAST_ROW_N_START, BLINKING };
