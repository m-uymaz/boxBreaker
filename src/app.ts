import AppState from './AppState/AppState.js';
import {
    initialRender,
    rerenderGrid,
    renderExplotions,
    rerenderThrowBox,
    renderArrow,
    rerenderCatchBox,
    renderBlinking
} from './rendering.js';
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
        if (AppState.gameOverState) return;
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

                    floodFillChain(AppState.thrownBox!);
                } else {
                    catchBox();
                    rerenderCatchBox();
                }
                break;
            default:
                if (AppState.fall) return;
                moveDown(AppState.gridArray);
                rerenderGrid();
                break;
        }
    });

    async function floodFillChain(position: { y: number, x: number }) {

        // Flood Fill changes the state instantaniously
        floodFill(AppState.gridArray, position);

        clearPrevTimeouts();

        if (!AppState.explodedBoxes.length) return;

        AppState.explodedBoxes.forEach(position => {
            renderBlinking(position);
        })

        await explodeDelay(500);
        fillEmptyGridSpaces();
        await rerenderDelay(100);

        AppState.checkBoxPositions.forEach((newPosition) => {
            floodFillChain(newPosition);
        });
    }

    function clearPrevTimeouts(): void {
        AppState.timeouts.explodeTimeout && clearTimeout(AppState.timeouts.explodeTimeout);
        AppState.timeouts.explodeTimeout = null;

        AppState.timeouts.rerenderTimeout && clearTimeout(AppState.timeouts.rerenderTimeout);
        AppState.timeouts.rerenderTimeout = null;
    }

    function explodeDelay(time: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
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
            } catch (err) {
                reject(console.error(err));
            }
        });
    }

    function rerenderDelay(time: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                const timeout = setTimeout(() => {
                    console.log('Rerender Grid');
                    rerenderGrid();
                    resolve();
                }, time);

                AppState.timeouts.rerenderTimeout = timeout;
            } catch (err) {
                reject(console.error(err));
            }
        });
    }

    type RadioInput = HTMLInputElement | null;

    const fallOnRadio: RadioInput = document.querySelector('#fall-on');
    fallOnRadio?.addEventListener('click', () => {
        if (AppState.fall) return;
        AppState.fall = true;
        AppState.interval = setInterval(intervalFunc, 100);
        fallOnRadio.blur();
    });

    const fallOffRadio: RadioInput = document.querySelector('#fall-off');
    fallOffRadio?.addEventListener('click', () => {
        if (!AppState.fall) return;
        AppState.fall = false;
        if (AppState.interval) {
            clearInterval(AppState.interval);
            AppState.interval = null;
        }
        fallOffRadio.blur();
    });
});