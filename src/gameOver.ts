import AppState from './AppState/AppState.js';

type H1Element = HTMLHeadingElement | null;

const gameOver = (): void => {
    AppState.gameOverState = true;
    const h1El: H1Element = document.querySelector('.blinking');
    if (h1El) h1El.style.display = 'block';
}

export default gameOver;