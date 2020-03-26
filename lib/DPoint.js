class DPoint
{
  constructor(position, r, color, vel, acel, up, target, bounce) {
    this.position = position;
    this.r = r;
    this.color = color;
    this.vel = vel;
    this.acel = acel;
    this.up = up || true;
    this.target = target || 0;
    this.bounce = bounce || false;
  }

  follow()
  {
    this.position.add(this.vel);
  }

  update()
  {
    this.position.add(this.vel);

    if (this.bounce) {

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

  draw(context, img = null, imgSize = 0){
    if (img) {
      context.save();
    }
    if (!img) {
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.fillStyle = this.color;
      context.arc(this.position.dx,this.position.dy,this.r,0,2*Math.PI);
      context.closePath();
      context.stroke();
      context.fill();
    }
    if (img) {
      
      context.drawImage(img, this.position.dx - this.r / 2 - imgSize / 2, this.position.dy - this.r / 2 - imgSize / 2, this.r + imgSize, this.r + imgSize);
      // Undo the clipping
      context.restore();
    }
  }

  distanceToAnOtherPoint(p){
    let dx = this.position.dx - p.dx;
    let dy = this.position.dy - p.dy;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
