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
    this.rad = new Vector2d(1,1);
    this.tan = new Vector2d(1,1);
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

  collide(points, audioString)
  {
    let distance = 9999;
    let pointIndex = 0;

    for (var i = 0; i < points.length; i++) {
      let tempDistance = this.distanceToAnOtherPoint(points[i].position);
      if (tempDistance < distance) {
        pointIndex = i;
        distance = tempDistance;
      }
    }
    this.rad.differenceVector(points[pointIndex].position, this.position);

    this.tan.dx = -this.rad.dy;
    this.tan.dy = this.rad.dx;

    this.rad.magnitude = 1;
    this.tan.magnitude = 1;

    this.rad.magnitude = this.vel.dot(this.rad);
    this.tan.magnitude = this.vel.dot(this.tan);

    if (distance < this.r + points[pointIndex].r) {
      if (points[pointIndex].vel) {
        let temp = new Vector2d(1,1);
        temp.dx = this.rad.dx;
        temp.dy = this.rad.dy;

        this.rad.dx = points[pointIndex].rad.dx;
        this.rad.dy = points[pointIndex].rad.dy;

        points[pointIndex].rad.dx = temp.dx;
        points[pointIndex].rad.dy = temp.dy;

        this.vel.sumVector(this.rad, this.tan);
        points[pointIndex].vel.sumVector(points[pointIndex].rad, points[pointIndex].tan);
        console.log("Colliding with dynamic point");
        return;
      }
      if (audioString != "") {
        let bumperSFX = new Audio();
        bumperSFX.src = audioString;
        bumperSFX.play();
      }
      this.rad.magnitude = -this.rad.magnitude;
      this.vel.sumVector(this.rad, this.tan);
    }
  }
}
