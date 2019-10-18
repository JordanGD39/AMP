const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(new Vector2d(200,200),20,"rgb(3, 252, 182)", true);
let b = new Point(new Vector2d(600,300),20,"rgb(3, 252, 182)", true);
let l = new LinearFunction(1,1, "grey");
let c = new Point(new Vector2d(100,100),10,"grey", false);
let d = new Point(new Vector2d(500,500),10,"grey", false);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,canvas.width,canvas.height);

  l.defineLineWithTwoPoints(a,b);

  c.position.dx = 0;
  c.position.dy = l.calcY(0);
  d.position.dx = canvas.width;
  d.position.dy = l.calcY(canvas.width);

  context.beginPath();
  context.moveTo(c.position.dx,c.position.dy);
  context.lineTo(d.position.dx,d.position.dy);
  context.stroke();

  a.draw(context);
  b.draw(context);
}

animate();
