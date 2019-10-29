class Arrow {
  constructor(pos, angle) {
    this.pos = pos;
    this.angle = angle || 0;
  }

  draw(context){
    let shaftHeight = 10;
    let shaftLength = 100;
    let headHeight = 30;
    let headLength = 15;

    context.save();
    context.translate(this.pos.dx, this.pos.dy);
    context.rotate(this.angle);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0, -shaftHeight/2);
    context.lineTo(shaftLength, -shaftHeight/2);
    context.lineTo(shaftLength, -headHeight/2);
    context.lineTo(shaftLength + headLength, 0);
    context.lineTo(shaftLength, headHeight/2);
    context.lineTo(shaftLength, shaftHeight/2);
    context.lineTo(0, shaftHeight/2);
    context.closePath();
    context.stroke();
    context.fill();

    context.restore();
  }
}
