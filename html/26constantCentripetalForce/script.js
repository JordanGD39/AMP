const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let earth = new Point(new Vector2d(width/2, height/2), 50, "blue", false);
let moon = new DPoint(new Vector2d(width/2 + 200, height/2 + 200), 20, "gray", new Vector2d(GetRandomNumber(-4, 4) ,GetRandomNumber(-4, 4)), new Vector2d(0,0));

function animate() {
  context.clearRect(0,0, width, height);
  moon.acc.differenceVector(earth.position, moon.position);
  moon.acc.magnitude = 1;

  moon.update();
  moon.draw(context);

  earth.draw(context);
  moon.acc.draw(context, moon.position, moon.acc.angle, "yellow", 50);
}

setInterval(animate, 10)

function GetRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
