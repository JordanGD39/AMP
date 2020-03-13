const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = new DPoint(new Vector2d(GetRandom(0, canvas.width), GetRandom(0, canvas.height)), 25, "blue", new Vector2d(0, 0), new Vector2d(0,0), true);

let points = [];

for (let i = 0; i < 10; i++) {
  points[i] = new Point(new Vector2d(GetRandom(0, canvas.width - 100), GetRandom(0, canvas.height - 200)), 20, "red", true);
}

let currTarget = Math.round(GetRandom(0, points.length - 1));

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < points.length; i++) {
    points[i].printText(i);
      if (i < points.length - 1) {
        context.strokeStyle = "black";
        context.beginPath();
        context.lineWidth = 5;
        context.moveTo(points[i].position.dx, points[i].position.dy);
        context.lineTo(points[i + 1].position.dx, points[i + 1].position.dy);
        context.closePath();
        context.stroke();
    }
  }

  for (var i = 0; i < points.length; i++) {
    points[i].draw(context);
  }
  player.draw(context);

  player.vel.differenceVector(points[currTarget].position, player.position);
  player.vel.scalarMul(0.1);
  player.follow();
  if (player.vel.magnitude < 0.1) {
    currTarget = Math.round(GetRandom(0, points.length - 1));
  }
}

animate();

function GetRandom(min, max)
{
  return Math.random() * max + min;
}
