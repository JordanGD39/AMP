const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(new Vector2d(canvas.width / 2 - 100, canvas.height / 2), 20, "blue", true);
let b = new Point(new Vector2d(canvas.width / 2 + 100, canvas.height / 2), 20, "red", true);
let c = new Point(new Vector2d(canvas.width / 2, canvas.height / 2 + 100), 20, "green", true);
let lineA = new LinearFunction(1,1);

let diffAB = new Vector2d(0,0);
let diffAC = new Vector2d(0,0);
let tan = new Vector2d(0,0);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  lineA.defineLineWithTwoPoints(a,b);
  lineA.draw(context);

  a.draw(context);
  b.draw(context);
  c.draw(context);

  diffAB.differenceVector(b.position, a.position);

  diffAC.differenceVector(c.position, a.position);

  tan.dx = -diffAC.dy;
  tan.dy = diffAC.dx;

  diffAC.magnitude = 1;
  tan.magnitude = 1;

  diffAC.magnitude = diffAB.dot(diffAC);
  tan.magnitude = diffAB.dot(tan);

  diffAB.draw(context, a.position, diffAB.angle, "yellow", 1);
  diffAC.draw(context, a.position, diffAC.angle, "yellow", 1);

  tan.draw(context, a.position, tan.angle, "yellow", 1);
}

animate();
