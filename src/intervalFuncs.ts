import AppState from './AppState/AppState.js';
import moveDown from './moveDown.js';
import { rerenderGrid } from './rendering.js';

function pauseInterval(): void {
    if (AppState.interval) {
        clearInterval(AppState.interval);
        AppState.interval = null;
    }
}

function intervalFunc(): void {
    console.log(AppState.countMilliseconds);
    if (
        !AppState.fall
        ||
        AppState.timeouts.explodeTimeout
        ||
        AppState.timeouts.rerenderTimeout
    ) return;

    if (AppState.gameOverState && AppState.interval) {
        clearInterval(AppState.interval);
        AppState.interval = null;
    }

    if (AppState.countMilliseconds === 2500) {
        moveDown(AppState.gridArray);
        rerenderGrid();
        AppState.countMilliseconds = 0;
    }

    AppState.countMilliseconds += 100;
}

export { intervalFunc, pauseInterval }