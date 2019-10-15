class Point {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.draggable = false;
  }

  draw(context){
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.fillStyle = this.color;
    context.arc(this.x,this.y,this.r,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
  }

  printText(myText){
    context.fillStyle = "black";
    context.font = "16px Courier New";
    context.fillText(myText, this.x-this.r + 13,this.y-this.r - 18);
  }

  position(vector){
    this.x = vector.dx;
    this.y = vector.dy;
  }

  distanceToAnOtherPoint(p){
    let dx = this.x - p.x;
    let dy = this.y - p.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  drag(){
    let dragStatus = false;
    let mousePosition = {};

    document.addEventListener('mousedown',(evt)=>{
      mousePosition.x = evt.clientX;
      mousePosition.y = evt.clientY;
      if(this.distanceToAnOtherPoint(mousePosition)<=this.r){
        dragStatus = true;
      } else {
        dragStatus = false;
      }
    });

    document.addEventListener('mousemove',(evt)=>{
      mousePosition.x = evt.clientX;
      mousePosition.y = evt.clientY;
      if(this.distanceToAnOtherPoint(mousePosition)<=this.r){
        canvas.style.cursor = "pointer";
        evt.stopImmediatePropagation();
      } else {
        canvas.style.cursor = "default";
      }
      if(dragStatus){
        this.x = mousePosition.x;
        this.y = mousePosition.y;
      }
    });

    document.addEventListener('mouseup',(evt)=>{
      dragStatus= false;
    })
  }
}
