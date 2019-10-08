const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];

let mouseVector = new Vector2d(0,0);

for (let i = 0; i < 6; i++)
{
  points[i] = new Point(getRandom(canvas.width),getRandom(canvas.height),20,"rgb(3, 252, 182)", i);
  points[i].drag();
}


function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);
  context.beginPath();
  context.fillStyle = "grey";

  context.moveTo(points[0].x,points[0].y);

  for (let i = 0; i < points.length; i++)
  {
    context.lineTo(points[i].x,points[i].y)
  }

  context.fill();
  context.closePath();
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
