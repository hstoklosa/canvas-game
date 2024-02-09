import { setDifficulty } from './modules/menu.js'
import { Player, Projectile, Enemy } from './modules/classes.js';
import { shootProjectile, projectiles } from './modules/projectiles.js'
import { spawnEnemies, enemies } from './modules/enemies.js';
import { handlePoints } from './modules/points.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');

// Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Game
const middle = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const player = new Player(middle.x, middle.y, 30, 'white');

let gameStarted = false;
let animationFrame;
const updateCanvas = () => {
    animationFrame = requestAnimationFrame(updateCanvas);

    // Leaving blurred trails behind
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.draw();

    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();

        if (projectile.x + projectile.radius < 0 || // left side
            projectile.x - projectile.radius > canvas.width || // right side
            projectile.y + projectile.radius < 0 || // top
            projectile.y - projectile.radius > canvas.height // bottom
        ) {
            projectiles.splice(projectileIndex, 1);
        }
    });

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();

        // Player & enemy collision
        const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (distance - player.radius - enemy.radius < 1) {

            // Removes flashing as animation tries to draw next frame
            setTimeout(() => {
                enemies.splice(enemyIndex, 1);
                cancelAnimationFrame(animationFrame);
            }, 0);
        }

        // Projectile & enemy enemy collision
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (distance - enemy.radius - projectile.radius < 1) {
                handlePoints(enemy);

                // Removes flashing as animation tries to draw next frame!
                setTimeout(() => {
                    enemies.splice(enemyIndex, 1);
                    projectiles.splice(projectileIndex, 1);
                }, 0);
            }
        });
    });
}



// Event Listeners
startButton.addEventListener('click', (e) => {
    setDifficulty();
    updateCanvas();
    gameStarted = true;
    e.stopPropagation();
});

window.addEventListener('click', (e) => {
    if (gameStarted) {
        shootProjectile(e, middle.y, middle.x);
    }
});

window.addEventListener('resize', () => {
    if (gameStarted) {
        setCanvasSize();
    }
});
