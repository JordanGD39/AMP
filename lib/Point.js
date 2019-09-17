class Point {
  constructor(position, color)
  {
    this.position = position;
    this.color = color;
  }
    draw(context){
      context.beginPath();
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
      context.arc(this.position.dx,this.position.dy,this.position.scale,0,2*Math.PI);
      context.stroke();
      context.fill();
      context.closePath();
    }
}
