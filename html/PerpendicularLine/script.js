const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(200,200,20,"rgb(3, 252, 182)");
let b = new Point(600,300,20,"rgb(3, 252, 182)");
let c = new Point(200,500,20,"rgb(3, 252, 182)");

let s = new Point(0,0,10,"grey");

let l = new LinearFunction(1,1);
let m = new LinearFunction(1,1);

a.drag();
b.drag();
c.drag();

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  l.defineLineWithTwoPoints(a, b);
  l.draw(context);

  m.slope = -1 / l.slope;
  m.intercept = c.y - m.slope * c.x;
  m.draw(context);

  s.x = l.intersection(m).x;
  s.y = l.intersection(m).y

  a.draw(context);
  b.draw(context);
  c.draw(context);
  s.draw(context);

  a.printText("A");
  b.printText("B");
  c.printText("C");
}

animate();
