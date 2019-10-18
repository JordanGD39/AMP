class Point {
  constructor(position, r, color, draggable) {
    this.position = position;
    this.r = r;
    this.color = color;
    this.draggable = draggable;
    if (this.draggable) {
      this.drag();
    }
  }

CalcMiddle(a,b)
{
  this.position.dx = (a.position.dx + b.position.dx)/2;
  this.position.dy = (a.position.dy + b.position.dy)/2;
}

CalcCross(a, b, c)
{
  this.position.dx = (a.position.dx + b.position.dx + c.position.dx)/3;
  this.position.dy = (a.position.dy + b.position.dy + c.position.dy)/3;

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

  printText(myText){
    context.fillStyle = "black";
    context.font = "18px sans-serif";
    context.fillText(myText, this.position.dx-this.r + 13,this.position.dy-this.r - 18);
  }

  distanceToAnOtherPoint(p){
    let dx = this.x - p.x;
    let dy = this.y - p.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

drag(){
  let dragging = false;

  window.addEventListener('mousedown',(evt)=>
  {
    let mouse = new Vector2d(evt.clientX,evt.clientY);
    let d = new Vector2d(0,0);
    d.differenceVector(mouse,this.position);

    if(d.magnitude < this.r)
    {
      console.log("Dragged");
      dragging = true;
    }
    else
    {
      dragging = false;
    }
  });

  window.addEventListener('mouseup',(evt)=>{
    dragging = false;
  });

  window.addEventListener('mousemove',(evt)=>{
    if(dragging){
      this.position.dx = evt.clientX;
      this.position.dy = evt.clientY;
    }

    let mouse = new Vector2d(evt.clientX,evt.clientY);
    let d = new Vector2d(0,0);
    d.differenceVector(mouse,this.position);

    if(d.magnitude < this.r)
    {
      document.body.style.cursor = "pointer";
      evt.stopImmediatePropagation();
    }
    else
    {
      document.body.style.cursor = "auto";
    }
  })
}
}
