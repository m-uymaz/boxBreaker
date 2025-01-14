const ARROW: string = 'X';
const ALICEBLUE: string = 'aliceblue';
const BLINKING: string = 'blinking';

enum KeyboardInputs {
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    Space = 'Space'
}

const GRID_BOXES_SIZE: number = 200;

const LAST_ROW_N_START: number = 190;

enum GridLengths {
    RowLength = 20,
    ColumsLength = 10
}

enum GridColumsIndeces {
    First = 0,
    Last = 9
}

enum GridRowIndeces {
    First = 0,
    NextToLast = 18,
    Last = 19
}

enum BoxColors {
    red = 'rgb(245, 66, 66)',
    green = 'rgb(66, 245, 85)',
    blue = 'rgb(66, 90, 245)',
    purple = 'rgb(245, 70, 225)',
    yellow = 'rgb(245, 240, 70)',
    orange = 'rgb(255, 172, 28)'
}

export {
    BoxColors,
    GridLengths,
    GridRowIndeces,
    KeyboardInputs,
    GridColumsIndeces,
    ALICEBLUE,
    ARROW,
    GRID_BOXES_SIZE,
    LAST_ROW_N_START,
    BLINKING
};