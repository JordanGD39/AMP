const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseVector = new Vector2d(0,0);

let a = new Point(new Vector2d(100, 100), 20, "rgb(3, 252, 182)", true);
let b = new Point(new Vector2d(500, 100), 20, "rgb(3, 252, 182)", true);
let c = new Point(new Vector2d(300, 400), 20, "rgb(3, 252, 182)", true);
let d = new Point(new Vector2d(0, 0), 15, "rgb(3, 252, 182)", false);
let e = new Point(new Vector2d(0, 0), 15, "rgb(3, 252, 182)", false);
let f = new Point(new Vector2d(0, 0), 15, "rgb(3, 252, 182)", false);

let s = new Point(new Vector2d(150, 150), 10, "white");

let l = new LinearFunction(1,1);
let m = new LinearFunction(1,1);
let n = new LinearFunction(1,1);

let o = new LinearFunction(1,1);
let p = new LinearFunction(1,1);
let q = new LinearFunction(1,1);


function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);

  l.defineLineWithTwoPoints(a,b);
  m.defineLineWithTwoPoints(a,c);
  n.defineLineWithTwoPoints(b,c);

  l.draw(context);
  m.draw(context);
  n.draw(context);

  o.defineLineWithTwoPoints(s, d);
  p.defineLineWithTwoPoints(s, e);
  q.defineLineWithTwoPoints(s, f);

  o.draw(context);
  p.draw(context);
  q.draw(context);

  a.draw(context);
  b.draw(context);
  c.draw(context);

  d.CalcMiddle(a,b);
  e.CalcMiddle(b,c);
  f.CalcMiddle(a,c);

  d.draw(context);
  e.draw(context);
  f.draw(context);

  s.CalcCross(a,b,c);

  s.draw(context);

  a.printText("A");
  b.printText("B");
  c.printText("C");
}

animate();
