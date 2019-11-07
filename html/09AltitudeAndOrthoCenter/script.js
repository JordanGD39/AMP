const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseVector = new Vector2d(0,0);

let a = new Point(new Vector2d(100, 100), 20, "rgb(3, 252, 182)", true);
let b = new Point(new Vector2d(500, 100), 20, "rgb(3, 252, 182)", true);
let c = new Point(new Vector2d(300, 400), 20, "rgb(3, 252, 182)", true);

let s = new Point(new Vector2d(0, 0), 10, "white");

let l = new LinearFunction(1,1);
let k = new LinearFunction(1,1);
let m = new LinearFunction(1,1);

let l2 = new LinearFunction(1,1);
let k2 = new LinearFunction(1,1);
let m2 = new LinearFunction(1,1);


function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);

  l.defineLineWithTwoPoints(a,b);
  k.defineLineWithTwoPoints(a,c);
  m.defineLineWithTwoPoints(b,c);

  l2.slope = -(1/m.slope);
  l2.intercept = a.position.dy - l2.slope * a.position.dx;
  m2.slope = -(1/k.slope);
  m2.intercept = b.position.dy - m2.slope * b.position.dx;
  k2.slope = -(1/l.slope);
  k2.intercept = c.position.dy - k2.slope * c.position.dx;

  l.draw(context);
  k.draw(context);
  m.draw(context);

  l2.draw(context);
  k2.draw(context);
  m2.draw(context);

  a.draw(context);
  b.draw(context);
  c.draw(context);

  s.position.dx = (m2.intercept - l2.intercept) / (l2.slope - m2.slope);
  s.position.dy = (l2.slope * s.position.dx) + l2.intercept;

  s.draw(context);

  a.printText("A");
  b.printText("B");
  c.printText("C");
}

animate();
