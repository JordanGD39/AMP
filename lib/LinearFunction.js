class LinearFunction {
  constructor(slope, intercept, color) {
    this.slope = slope;
    this.intercept = intercept;
    this.color = color || "black";
  }

  calcY(x){
    return this.slope * x + this.intercept;
  }

  calcPerp(a, b)
  {
    this.slope = -(1/b.slope);
    this.intercept = a.position.dy - this.slope * a.position.dx;
  }

  defineLineWithTwoPoints(a, b){
    this.slope = (b.position.dy - a.position.dy) / (b.position.dx - a.position.dx);
    this.intercept = a.position.dy - this.slope * a.position.dx;
  }

  draw(context, color){
    this.color = color || "black";
    context.strokeStyle = this.color
    context.beginPath();
    context.moveTo(0, this.calcY(0));
    context.lineTo(canvas.width,this.calcY(canvas.width));
    context.closePath();
    context.stroke();
  }

  intersection(m){
    let ans = {};
    ans.x = (m.intercept - this.intercept) / (this.slope - m.slope);
    ans.y = this.calcY(ans.x);
    return ans;
  }
}
