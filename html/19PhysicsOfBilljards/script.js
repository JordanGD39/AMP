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

let knuckles = new Image();
knuckles.src = "Img/Knuckles.png";

let points = [];
let pointsSonicCol = [];
let pointsKnucklesCol = [];

for (var i = 0; i < 2; i++) {
  points[i] = new Point(new Vector2d(GetRandom(0, canvas.width), GetRandom(0, canvas.height)), canvas.height * 0.1, "red", true);
  if (points[i].position.dx < canvas.width / 2 + points[i].r && points[i].position.dx > canvas.width / 2 - points[i].r) {
    points[i].position.dx += points[i].r * 2.5;
  }
}

pointsSonicCol = points.slice();

let sonicPoint = new DPoint(new Vector2d(canvas.width / 2, canvas.height / 2), canvas.height * 0.08, "blue", new Vector2d(canvas.height * 0.01, canvas.height * 0.01));
let knucklesPoint = new DPoint(new Vector2d(10, 10), canvas.height * 0.08, "red", new Vector2d(canvas.height * 0.008, canvas.height * 0.008));

pointsSonicCol.push(knucklesPoint);

function animate(){
  music.play();
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

for (var i = 0; i < points.length; i++) {
    points[i].draw(context);
    points[i].printText("Drag me for sound!", "white");
    drawStar(points[i].position.dx , points[i].position.dy, 5, points[i].r * 0.7, points[i].r * 0.35, context);
}
  sonicPoint.collide(pointsSonicCol, "Audio/Bumper.mp3");
  knucklesPoint.collide(points, "Audio/Bumper.mp3");

  sonicPoint.update();
  sonicPoint.draw(context, sonic, 20);

  knucklesPoint.update();
  knucklesPoint.draw(context, knuckles, 20);

  sonicPoint.vel.draw(context, sonicPoint.position, sonicPoint.vel.angle, "yellow", 5);
  sonicPoint.rad.draw(context, sonicPoint.position, sonicPoint.rad.angle, "blue", 5);
  sonicPoint.tan.draw(context, sonicPoint.position, sonicPoint.tan.angle, "green", 5);

  knucklesPoint.vel.draw(context, knucklesPoint.position, knucklesPoint.vel.angle, "yellow", 5);
  knucklesPoint.rad.draw(context, knucklesPoint.position, knucklesPoint.rad.angle, "blue", 5);
  knucklesPoint.tan.draw(context, knucklesPoint.position, knucklesPoint.tan.angle, "green", 5);
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

function addBumper(count)
{
  for (var i = 0; i < count; i++) {
    points[points.length] = new Point(new Vector2d(GetRandom(0, canvas.width), GetRandom(0, canvas.height)), 100, "red", true);
  }
  console.log("Bumper(s) added!");
}
