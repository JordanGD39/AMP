class LinearFunction {
  constructor(slope, intercept, color) {
    this.slope = slope;
    this.intercept = intercept;
    this.color = color || "black";
  }

  calcY(x){
    return this.slope * x + this.intercept;
  }

  defineLineWithTwoPoints(a, b){
    this.slope = (b.y - a.y) / (b.x - a.x);
    this.intercept = a.y - this.slope * a.x;
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
