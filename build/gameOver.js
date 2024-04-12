import AppState from './AppState/AppState.js';
const gameOver = () => {
    AppState.gameOverState = true;
    const h1El = document.querySelector('.blinking');
    if (h1El)
        h1El.style.display = 'block';
};
export default gameOver;
