const pointsIndicator = document.getElementById('points');

let points = 0;
pointsIndicator.innerHTML = points;

export const handlePoints = (enemy) => {

    if (enemy.radius <= 10) {
        points = points + 15;
    } else if (enemy.radius <= 2) {
        points = points + 10;
    } else {
        points = points + 5;
    }

    pointsIndicator.innerHTML = points;
}
