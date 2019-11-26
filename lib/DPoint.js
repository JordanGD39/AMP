class DPoint
{
  constructor(position, r, color, vel, acel, up) {
    this.position = position;
    this.r = r;
    this.color = color;
    this.vel = vel;
    this.acel = acel;
    this.up = up || true;
  }

  update()
  {
    this.position.add(this.vel);
    
    if (this.up) {
      this.vel.dy += 1;
      if (this.vel.dy > 30) {
        this.up = false;
      }
    }
    else {
      this.vel.dy -= 1;
      if (this.vel.dy < -25) {
        this.up = true;
      }
    }

    if (this.position.dx > canvas.width - this.r) {
      this.vel.dx = -Math.abs(this.vel.dx);
    }
    else if(this.position.dy > canvas.height - this.r) {
      this.vel.dy = -Math.abs(this.vel.dy);
    }
    else if (this.position.dy < this.r) {
      this.vel.dy = Math.abs(this.vel.dy);
    }
    else if (this.position.dx < this.r) {
      this.vel.dx = Math.abs(this.vel.dx);
    }
  }

  draw(context){
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.fillStyle = this.color;
    context.arc(this.position.dx,this.position.dy,this.r,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
  }
}
