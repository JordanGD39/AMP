const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(new Vector2d(390, 200), 20, "rgb(3, 252, 182)", true);
let b = new Point(new Vector2d(690, 210), 20, "rgb(3, 252, 182)", true);
let c = new Point(new Vector2d(390, 500), 20, "rgb(3, 252, 182)", true);
let d = new Point(new Vector2d(690, 100), 20, "rgb(3, 252, 182)", true);

let s = new Point(new Vector2d(0, 0), 10, "grey");

let l = new LinearFunction(0, 0);
let m = new LinearFunction(0, 0);
function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  l.defineLineWithTwoPoints(a, b);
  l.draw(context);

  m.defineLineWithTwoPoints(c, d);
  m.draw(context);

  s.position.dx = l.intersection(m).x;
  s.position.dy = l.intersection(m).y

  a.draw(context);
  b.draw(context);
  c.draw(context);
  d.draw(context);

  s.draw(context);

  a.printText("A");
  b.printText("B");
  c.printText("C");
  d.printText("D");
}

animate();
