const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circles = [];

animate();

function animate() {
  context.clearRect(0,0,width, height)
  requestAnimationFrame(animate);
  let a = new Point(new Vector2d(getRandom(width),getRandom(height), 0.1), "rgb("+ getRandom(255)+","+ getRandom(255)+","+ getRandom(255)+")");
  circles.push(a);

  for (let i = 0; i < circles.length; i++) {
    circles[i].position.scale += 0.5;
    circles[i].draw(context);
    if (circles[i].position.scale > 200) {
      circles.splice(i,1);
    }
  }
}

function getRandom(max)
{
  return Math.floor(Math.random()*max)
}
