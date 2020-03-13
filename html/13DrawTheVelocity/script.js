const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dpoints = [];

for (var i = 0; i < 20; i++) {
  dpoints[i] = new DPoint(new Vector2d(GetRandom(0, 1000), GetRandom(0, 300)), GetRandom(10, 20), "blue", new Vector2d(GetRandom(-2, 2), GetRandom(5, 10)), new Vector2d(0,0), true, 0, true);
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);


  for (var a = 0; a < dpoints.length; a++) {
    dpoints[a].update();
    dpoints[a].vel.draw(context, dpoints[a].position, dpoints[a].vel.angle, "yellow", 5);
    dpoints[a].draw(context);
  }
}

animate();

function GetRandom(min, max)
{
  return Math.random() * max + min;
}
