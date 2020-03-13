const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let a = new Point(new Vector2d(canvas.width / 2 - 100, canvas.height / 2), 20, "blue", true);
let b = new Point(new Vector2d(canvas.width / 2 + 100, canvas.height / 2), 20, "red", true);
let s = new Point(new Vector2d(canvas.width / 2 + 100, canvas.height / 2), 20, "white", true);
let movingPoint = new DPoint(new Vector2d(canvas.width / 2, canvas.height / 2 + 100), 15, "yellow", new Vector2d(10,10));

let lineA = new LinearFunction(1,1);
let lineDPoint = new LinearFunction(1,1);

s.CalcMiddle(a,b);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  lineA.defineLineWithTwoPoints(a,b);
  lineA.draw(context);

  a.draw(context);
  b.draw(context);
  s.draw(context);
  movingPoint.update();
  lineDPoint.calcPerp(movingPoint, lineA);
  lineDPoint.draw(context);
  movingPoint.draw(context);

  //tan.dx = -diffAC.dy;
  //tan.dy = diffAC.dx;

  //diffAC.magnitude = 1;
  //tan.magnitude = 1;

  //diffAC.magnitude = diffAB.dot(diffAC);
  //tan.magnitude = diffAB.dot(tan);

  //diffAC.draw(context, a.position, diffAC.angle, "yellow", 1);

  //tan.draw(context, a.position, tan.angle, "yellow", 1);
}

animate();
