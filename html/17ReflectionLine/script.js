const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(new Vector2d(canvas.width / 2 - 100, canvas.height / 2 - 10), 20, "blue", true);
let b = new Point(new Vector2d(canvas.width / 2 + 100, canvas.height / 2), 20, "red", true);
let s = new Point(new Vector2d(canvas.width / 2 + 100, canvas.height / 2), 10, "white", false);
let movingPoint = new DPoint(new Vector2d(canvas.width / 2, canvas.height / 2 + 100), 15, "yellow", new Vector2d(10,10));

let lineA = new LinearFunction(1,1);
let lineDPoint = new LinearFunction(1,1);
let rad = new Vector2d(1,1);
let tan = new Vector2d(1,1);

s.CalcMiddle(a,b);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  lineA.defineLineWithTwoPoints(a,b);
  lineA.draw(context);

  a.draw(context);
  b.draw(context);
  movingPoint.update();
  lineDPoint.calcPerp(movingPoint, lineA);
  lineDPoint.draw(context);
  movingPoint.draw(context);

  let int = {};
  int = lineDPoint.intersection(lineA);

  s.position = new Vector2d(int.x, int.y);

  rad.differenceVector(s.position, movingPoint.position);

  tan.dx = -rad.dy;
  tan.dy = rad.dx;

  rad.magnitude = 1;
  tan.magnitude = 1;

  rad.magnitude = movingPoint.vel.dot(rad);
  tan.magnitude = movingPoint.vel.dot(tan);

  let distance = movingPoint.distanceToAnOtherPoint(s.position);

  if (distance < movingPoint.r) {
    rad.magnitude = -rad.magnitude;
    movingPoint.vel.sumVector(rad, tan);
  }

  s.draw(context);
  movingPoint.vel.draw(context, movingPoint.position, movingPoint.vel.angle, "yellow", 5);
  rad.draw(context, s.position, rad.angle, "blue", 5);
  tan.draw(context, s.position, tan.angle, "green", 5);
}

animate();
