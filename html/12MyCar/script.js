const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let car = new Image();
car.src = "img/Car.png";

car.pos = new Vector2d(0,480);
car.vel = new Vector2d(0,0);

let wheelFront = new Image();
wheelFront.src = "img/Wheel.png";
wheelFront.rotation = 0;

let wheelBack = new Image();
wheelBack.src = "img/Wheel.png";
wheelBack.rotation = 0;

let notPressing = true;

car.addEventListener('load', () =>
{
  Animate();
})

function Animate(){
  requestAnimationFrame(Animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  car.pos.add(car.vel);
  context.drawImage(car, car.pos.dx, car.pos.dy);

  wheelFront.pos = new Vector2d(car.pos.dx + 152 + wheelFront.width/2, car.pos.dy + 53 + wheelFront.width/2);
  wheelFront.rotation += car.vel.dx / (wheelFront.width/2);

  context.save();
  context.translate(wheelFront.pos.dx, wheelFront.pos.dy);
  context.rotate(wheelFront.rotation);
  context.drawImage(wheelFront, -wheelFront.width/2, -wheelFront.width/2);
  context.restore();

  wheelBack.pos = new Vector2d(car.pos.dx + 59 + wheelBack.width/2, car.pos.dy + 53 + wheelBack.width/2);
  wheelBack.rotation += car.vel.dx / (wheelBack.width/2);

  context.save();
  context.translate(wheelBack.pos.dx, wheelBack.pos.dy);
  context.rotate(wheelBack.rotation);
  context.drawImage(wheelBack, -wheelBack.width/2, -wheelBack.width/2);
  context.restore();

  context.drawImage(car, car.pos.dx, car.pos.dy);

  if (notPressing)
  {
    if (car.vel.dx > 0)
    {
      car.vel.dx -= 0.125;
    }
    else if (car.vel.dx < 0)
    {
      car.vel.dx += 0.125;
    }
  }

  Clamp();
}

addEventListener('keydown', event =>
{
  if (event.keyCode == 39)
  {
    notPressing = false;
    car.vel.dx += 0.5;
    if (car.vel.dx > 39)
    {
      car.vel.dx = 39;
    }
  }
  else if (event.keyCode == 37)
  {
    notPressing = false;
    if (car.vel.dx > 0)
    {
      car.vel.dx -= 1;
    }
    else
    {
      car.vel.dx -= 0.5;
    }

    if (car.vel.dx < -39)
    {
      car.vel.dx = -39;
    }
  }
});

addEventListener('keyup', event =>
{
  if (event.keyCode == 39)
  {
    notPressing = true;
  }
  else if (event.keyCode == 37)
  {
    notPressing = true;
  }
});

function Clamp()
{
  if (car.pos.dx > canvas.width) {
    car.pos.dx = -car.width;
  }
  else if (car.pos.dx < 0 - car.width) {
    car.pos.dx = canvas.width;
  }
}
