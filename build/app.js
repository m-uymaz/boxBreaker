var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AppState from './AppState/AppState.js';
import { initialRender, rerenderGrid, renderExplotions, rerenderThrowBox, renderArrow, rerenderCatchBox, renderBlinking } from './rendering.js';
import { floodFill, fillEmptyGridSpaces } from './floodFillFuncs.js';
import moveDown from './moveDown.js';
import moveArrow from './playerMovement.js';
import catchBox from './catchBox.js';
import throwBox from './throwBox.js';
import { intervalFunc } from './intervalFuncs.js';
import { KeyboardInputs } from './consts/consts.js';
window.addEventListener('load', function () {
    initialRender();
    window.addEventListener('keydown', (e) => {
        if (AppState.gameOverState)
            return;
        switch (e.code) {
            case KeyboardInputs.ArrowLeft:
                moveArrow(AppState.gridArray, KeyboardInputs.ArrowLeft);
                renderArrow(KeyboardInputs.ArrowLeft);
                break;
            case KeyboardInputs.ArrowRight:
                moveArrow(AppState.gridArray, KeyboardInputs.ArrowRight);
                renderArrow(KeyboardInputs.ArrowRight);
                break;
            case KeyboardInputs.Space:
                if (AppState.coughtBox) {
                    throwBox();
                    rerenderThrowBox();
                    floodFillChain(AppState.thrownBox);
                }
                else {
                    catchBox();
                    rerenderCatchBox();
                }
                break;
            default:
                if (AppState.fall)
                    return;
                moveDown(AppState.gridArray);
                rerenderGrid();
                break;
        }
    });
    function floodFillChain(position) {
        return __awaiter(this, void 0, void 0, function* () {
            // Flood Fill changes the state instantaniously
            floodFill(AppState.gridArray, position);
            clearPrevTimeouts();
            if (!AppState.explodedBoxes.length)
                return;
            AppState.explodedBoxes.forEach(position => {
                renderBlinking(position);
            });
            yield explodeDelay(500);
            fillEmptyGridSpaces();
            yield rerenderDelay(100);
            AppState.checkBoxPositions.forEach((newPosition) => {
                floodFillChain(newPosition);
            });
        });
    }
    function clearPrevTimeouts() {
        AppState.timeouts.explodeTimeout && clearTimeout(AppState.timeouts.explodeTimeout);
        AppState.timeouts.explodeTimeout = null;
        AppState.timeouts.rerenderTimeout && clearTimeout(AppState.timeouts.rerenderTimeout);
        AppState.timeouts.rerenderTimeout = null;
    }
    function explodeDelay(time) {
        return new Promise((resolve, reject) => {
            try {
                const timeout = setTimeout(() => {
                    console.log('Explode and fill empty spaces');
                    AppState.explodedBoxes.forEach((position) => {
                        renderExplotions(position);
                    });
                    fillEmptyGridSpaces();
                    resolve();
                }, time);
                AppState.timeouts.explodeTimeout = timeout;
            }
            catch (err) {
                reject(console.error(err));
            }
        });
    }
    function rerenderDelay(time) {
        return new Promise((resolve, reject) => {
            try {
                const timeout = setTimeout(() => {
                    console.log('Rerender Grid');
                    rerenderGrid();
                    resolve();
                }, time);
                AppState.timeouts.rerenderTimeout = timeout;
            }
            catch (err) {
                reject(console.error(err));
            }
        });
    }
    const fallOnRadio = document.querySelector('#fall-on');
    fallOnRadio === null || fallOnRadio === void 0 ? void 0 : fallOnRadio.addEventListener('click', () => {
        if (AppState.fall)
            return;
        AppState.fall = true;
        AppState.interval = setInterval(intervalFunc, 100);
        fallOnRadio.blur();
    });
    const fallOffRadio = document.querySelector('#fall-off');
    fallOffRadio === null || fallOffRadio === void 0 ? void 0 : fallOffRadio.addEventListener('click', () => {
        if (!AppState.fall)
            return;
        AppState.fall = false;
        if (AppState.interval) {
            clearInterval(AppState.interval);
            AppState.interval = null;
        }
        fallOffRadio.blur();
    });
});
