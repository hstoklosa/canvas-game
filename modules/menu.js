import { spawnEnemies } from './enemies.js';

const difficulties = {
    easy: 800,
    intermediate: 500,
    hard: 300,
    extreme: 200
}

let difficulty;

export const setDifficulty = (updateCanvas) => {
    const difficultyInputs = document.getElementsByName('difficulty');

    difficultyInputs.forEach(input => {
        if (input.checked) {
            difficulty = difficulties[input.value];
        }
    });
    document.body.classList.add('on');

    setInterval(() => spawnEnemies(), difficulty);
    updateCanvas();
}