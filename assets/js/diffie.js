

  var width = 100;
    height = 200;

  var svg = d3.select('#mid').append('svg')
    .attr('width', width)
    .attr('height', height);

  var ex1 = svg.append('g');

    ex1.append('path')
    .attr('class', 'flowline')
    .attr('d', 'M100 75 L0 75');  

    ex1.append('path')
    .attr('class', 'flowline-blue')
    .attr('d', 'M0 120 L100 120');  


  function animate() {
    d3.select(this)
      .transition()
      .ease("linear")
      .duration(1000)
      .styleTween("stroke-dashoffset", function () {
        return d3.interpolate(0, 14);
      })
      .each("end", animate);
  }

  d3.selectAll(".flowline")
    .each(animate);
  d3.selectAll(".flowline-blue")
    .each(animate);
