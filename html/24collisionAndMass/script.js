const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let a = new DPoint(new Vector2d(200,200), 50, "yellow", new Vector2d(4,8), new Vector2d(0,0));
let b = new DPoint(new Vector2d(500,400), 20, "blue", new Vector2d(4,8), new Vector2d(0,0));
let difference = new Vector2d(1,1);

//add mass
a.mass = a.r * a.r;
b.mass = b.r * b.r;

//radial component
a.rad = new Vector2d(1,1);
b.rad = new Vector2d(1,1);

//tangiale component
a.tan = new Vector2d(1,1);
b.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  a.update();
  b.update();
  difference.differenceVector(b.position, a.position);

  b.draw(context);
  a.draw(context);
  a.vel.draw(context, a.position, a.vel.angle, "white");
  b.vel.draw(context, b.position, b.vel.angle, "white");

  a.rad.draw(context, a.position, a.rad.angle, "orange", 5);
  a.tan.draw(context, a.position , a.tan.angle, "orange", 5);

  b.rad.draw(context, b.position, b.rad.angle, "red", 5);
  b.tan.draw(context, b.position , b.tan.angle, "red", 5);

  a.rad.dx = difference.dx;
  a.rad.dy = difference.dy;

  b.rad.dx = difference.dx;
  b.rad.dy = difference.dy;

  a.rad.magnitude = 1;
  b.rad.magnitude = 1;

  a.rad.magnitude = a.rad.dot(a.vel);
  b.rad.magnitude = b.rad.dot(b.vel);

  a.tan.dx = -a.rad.dy
  a.tan.dy = a.rad.dx

  b.tan.dx = -b.rad.dy
  b.tan.dy = b.rad.dx

  a.tan.magnitude = 1;
  b.tan.magnitude = 1;

  a.tan.magnitude = a.tan.dot(a.vel);
  b.tan.magnitude = b.tan.dot(b.vel);

  if(difference.magnitude < a.r + b.r){

  let msum = a.mass + b.mass;
  let mab = a.mass - b.mass;
  let mba = b.mass - a.mass;

  p = new Vector2d(1,1);
  q = new Vector2d(1,1);
  r = new Vector2d(1,1);
  s = new Vector2d(1,1);

  p.equals(a.rad);
  q.equals(b.rad);
  r.equals(a.rad);
  s.equals(b.rad);

  p.scalarMul(mab/msum);
  q.scalarMul(2 * b.mass / msum);
  r.scalarMul(2 * a.mass / msum);
  s.scalarMul(mba / msum);

  a.rad.sumVector(p,q);
  b.rad.sumVector(r,s);

  a.vel.sumVector(a.rad,a.tan);
  b.vel.sumVector(b.rad,b.tan);
  }
}

animate();
