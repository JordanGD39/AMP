const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let points = [];

let mouseVector = new Vector2d(0,0);

for (let i = 0; i < 4; i++)
{
  points[i] = new Point(new Vector2d(getRandom(width),getRandom(height)),20,"rgb(3, 252, 182)", i);
}

function animate()
{
  context.clearRect(0,0,width,height);
  requestAnimationFrame(animate);

  context.beginPath();

  context.moveTo(points[0].position.dx,points[0].position.dy);

  for (let i = 0; i < points.length; i++)
  {
    context.lineTo(points[i].position.dx,points[i].position.dy)
  }

  context.closePath();
  context.fillStyle="grey";
  context.fill();
  context.strokeStyle="black";
  context.lineWidth = 5;
  context.stroke();
  for (let i = 0; i < points.length; i++)
  {
    points[i].draw(context);
  }
}

animate();

function getRandom(max)
{
  return Math.floor(Math.random()*max);
}
