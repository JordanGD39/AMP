const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseVector = new Vector2d(0,0);

let  a = new Point(new Vector2d(100,110), 15, "rgb(3, 252, 182)",true);
let  b = new Point(new Vector2d(500,100), 15,"rgb(3, 252, 182)" ,true);
let  c = new Point(new Vector2d(300,500), 15, "rgb(3, 252, 182)",true);
let  d = new Point(new Vector2d(0,0), 5, "black",false);
let  e = new Point(new Vector2d(0,0), 5, "black",false);
let  f = new Point(new Vector2d(0,0), 5, "black",false);
let  s = new Point(new Vector2d(0,0), 5, "black",false);

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
  m.defineLineWithTwoPoints(c,b);
  n.defineLineWithTwoPoints(c,a);

  o.calcPerp(d,l);
  p.calcPerp(f,m);
  q.calcPerp(e,n);

  l.draw(context);
  m.draw(context);
  n.draw(context);
  o.draw(context);
  p.draw(context);
  q.draw(context);

  d.CalcMiddle(a,b);
  e.CalcMiddle(a,c);
  f.CalcMiddle(b,c);

  a.draw(context);
  b.draw(context);
  c.draw(context);
  d.draw(context);
  e.draw(context);
  f.draw(context);

  s.CalcCircleDistance(b, context);
  s.position.dx = (p.intercept - o.intercept) / (o.slope - p.slope);
  s.position.dy = (o.slope * s.position.dx) + o.intercept;
  s.draw(context);

  a.printText("A");
  b.printText("B");
  c.printText("C");
}

animate();
