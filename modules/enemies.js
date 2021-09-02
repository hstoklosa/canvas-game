import { Enemy } from './classes.js'

export const enemies = [];

export const spawnEnemies = () => {
    const radius = Math.floor(Math.random() * (30 - 5) + 5);
    let x, y;

    if (Math.random() < 0.5) {

        /*
          x = 0 - radius <---- coming from left side
          x = canvas.width - radius <---- coming from right side
 
          y = Math.random() * canvas.height; <---- coming at random height
        */

        x = Math.random() < 0.5 ? 0 - radius : canvas.width - radius;
        y = Math.random() * canvas.height;
    } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.heigth - radius;
    }

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    enemies.push(new Enemy(x, y, radius, Enemy.randomColour(), velocity))
}