import { Projectile } from './classes.js';

export const projectiles = [];

export const shootProjectile = (e, middleY, middleX) => {
    const angle = Math.atan2(
        e.clientY - middleY,
        e.clientX - middleX
    )

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(
        new Projectile(middleX, middleY, 10, 'white', velocity)
    );
}