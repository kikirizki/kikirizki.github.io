var myArc = {
  scope: $('#my-arc-01'),
  increment:1.5,
  angle:0,

  parameters: {
    originX:104,
    originY:4,
    radius:100,
    largeArc:false,
    sweep:false,
    arcToX:200,
    arcToY:100
  },

  step:function(){
    var p = this.parameters;
    this.angle += this.increment;
    this.angle %= 360;
    p.largeArc = this.angle > 180;
    var a = this.toRad(this.angle);
    p.arcToX = p.originX + p.radius * Math.sin(a);
    p.arcToY = p.originY + p.radius - p.radius * Math.cos(a);
  },

  write:function(){
    var p = this.parameters;
    var move = "M" + p.originX + " " + p.originY;
    var arc = "A " + p.radius + " " + p.radius + ", 0, " + (+ p.largeArc) + ", 1, " + p.arcToX + " " + p.arcToY;
    this.scope.attr("d", move + " " + arc);
    $("#triangle-1").attr("d","M104 104 L" + p.arcToX + " " + p.arcToY + " L" + p.arcToX + " 104 L104 104");
    $("#triangle-2").attr("d","M" + p.arcToX + " " + p.arcToY + " L104 " + p.arcToY + " L104 104");
  },

  toRad:function(deg){
    return deg / 180 * Math.PI
  }
};

setInterval(function(){
  myArc.step();
  myArc.write();
},20)
