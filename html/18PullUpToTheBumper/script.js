const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let music = new Audio();
music.src = "Audio/Sonic 1 Music Spring Yard Zone.mp3";
music.volume = 0.4;
music.loop = true;

let sonic = new Image();
sonic.src = "Img/Sonic.png";

let rad = new Vector2d(1,1);
let tan = new Vector2d(1,1);

let points = [];

for (var i = 0; i < 5; i++) {
  points[i] = new Point(new Vector2d(GetRandom(0, canvas.width), GetRandom(0, canvas.height)), 100, "red", true);
  if (points[i].position.dx < canvas.width / 2 + points[i].r && points[i].position.dx > canvas.width / 2 - points[i].r) {
    points[i].position.dx += points[i].r * 2.5;
  }
}

let movingPoint = new DPoint(new Vector2d(canvas.width / 2, canvas.height / 2), 70, "blue", new Vector2d(10,10));

function animate(){
  music.play();
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  movingPoint.update();
  movingPoint.draw(context, sonic, 20);

  let distance = 9999;
  let pointIndex = 0;

  for (var i = 0; i < points.length; i++) {
    points[i].draw(context);
    points[i].printText("Drag me for sound!", "white");
    drawStar(points[i].position.dx , points[i].position.dy, 5, 70, 35, context);
    let tempDistance = movingPoint.distanceToAnOtherPoint(points[i].position);
    if (tempDistance < distance) {
      pointIndex = i;
      distance = tempDistance;
    }
  }
  rad.differenceVector(points[pointIndex].position, movingPoint.position);

  tan.dx = -rad.dy;
  tan.dy = rad.dx;

  rad.magnitude = 1;
  tan.magnitude = 1;

  rad.magnitude = movingPoint.vel.dot(rad);
  tan.magnitude = movingPoint.vel.dot(tan);

  if (distance - points[pointIndex].r < movingPoint.r) {
    let bumperSFX = new Audio();
    bumperSFX.src = "Audio/Bumper.mp3";
    bumperSFX.play();
    rad.magnitude = -rad.magnitude;
    movingPoint.vel.sumVector(rad, tan);
  }

  movingPoint.vel.draw(context, movingPoint.position, movingPoint.vel.angle, "yellow", 5);
  rad.draw(context, movingPoint.position, rad.angle, "blue", 5);
  tan.draw(context, movingPoint.position, tan.angle, "green", 5);
}

animate();

function drawStar(cx, cy, spikes, outerRadius, innerRadius, ctx){
      let rot = Math.PI/2*3;
      let x = cx;
      let y = cy;
      let step = Math.PI/spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius)
      for(i=0; i <spikes; i++){
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x,y);
        rot += step;
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.lineWidth=5;
      ctx.strokeStyle='yellow';
      ctx.stroke();
      ctx.fillStyle='#fdfc81';
      ctx.fill();
    }

function GetRandom(min, max)
{
  return Math.random() * max + min;
}
