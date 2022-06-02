function create_node(dom_obj, height, width, x, y) {
    dom_obj.append('rect')
      .attr('class', 'node')
      .attr('x', x - (width / 2))
      .attr('y', y - height / 2)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('width', width)
      .attr('height', height)
  }
  function create_text(dom_obj, x, y, box_h, box_w, text_str) {
    dom_obj.append("text")
      .attr('fill', '#747474').attr("font-size","smaller")
      .attr('x', x - (box_w / 2))
      .attr('y', y + 5)
      .text(text_str);

  }

  var width = 700;
    height = 500;

  var svg = d3.select('#generator').append('svg')
    .attr('width', width)
    .attr('height', height);

  var ex1 = svg.append('g')
    .attr('transform', 'translate(50 50)');


  ex1.append('path')
    .attr('class', 'flowline')
    .attr('d', 'M200 150  S100 100 100 250');
    ex1.append('path')
    .attr('class', 'flowline-green')
    .attr('d', 'M100 270  S100 100 200 170');
  
  ex1.append('path')
    .attr('class', 'flowline')
    .attr('d', 'M100 250 L100 350');  



 
  ex1.append('path')
    .attr('class', 'flowline-green')
    .attr('d', 'M210 150 L210 25');    

  ex1.append('path')
    .attr('class', 'flowline')
    .attr('d', 'M195 25 L195 150');    


     ex1.append('path')
    .attr('class', 'flowline')
    .attr('d', 'M150 300 L175 300');  
    create_text(ex1, 230, 300, 50, 100, "input fake data");



    ex1.append('path')
    .attr('class', 'flowline-green')
    .attr('d', 'M150 320 L175 320');
    create_text(ex1, 230, 320, 50, 100, "generator backward propagation"); 
    create_text(ex1, 205, 340, 50, 100, "!!!");   
    create_text(ex1, 230, 340, 50, 100, "discriminator weights aren't updated"); 
      
    
  
  
  


  create_node(ex1, 50, 50, 200, 25);
  create_text(ex1, 235, 25, 50, 100, "Loss");

  create_node(ex1, 50, 80, 300, 250);
  create_text(ex1, 320, 250, 50, 100, "Dataset");

  create_node(ex1, 50, 120, 200, 150);
 
  create_text(ex1, 200, 150, 50, 100, "Discriminator");
  
  create_node(ex1, 50, 100, 100, 250);
  create_text(ex1, 112, 250, 50, 100, "Generator");
  
  create_node(ex1, 50, 80, 100, 350);
  create_text(ex1, 130, 350, 350, 100, "Noise");


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
d3.selectAll(".flowline-green")
    .each(animate);  