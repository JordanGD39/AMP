const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(200,200,20,"rgb(3, 252, 182)");
let b = new Point(600,300,20,"rgb(3, 252, 182)");
let l = new LinearFunction(0.5,0.5, "grey");
let c = new Point(100,l.calcY(100),10);
let d = new Point(500,l.calcY(500),10);

a.drag();
b.drag();

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,canvas.width,canvas.height);

  l.defineLineWithTwoPoints(a,b);

  c.x = 0;
  c.y = l.calcY(0);
  d.x = canvas.width;
  d.y = l.calcY(canvas.width);

  context.beginPath();
  context.moveTo(c.x,c.y);
  context.lineTo(d.x,d.y);
  context.stroke();

  a.draw(context);
  b.draw(context);
}

animate();
