var nn;
function setup() {
    var cnv=createCanvas(640,360);
   
    cnv.parent("nn");
    nn = new Network(width/2, height/2);
    var a1 = new Neuron(-275,0);
    var b1 = new Neuron(-150, -75);
    var b2 = new Neuron(-150, -25);
    var b3 = new Neuron(-150, 25);
    var b4 = new Neuron(-150, 75);
    var c1 = new Neuron(0, -100);
    var c2 = new Neuron(0,-50);
    var c3 = new Neuron(0, 0);
    var c4 = new Neuron(0, 50);
    var c5 = new Neuron(0, 100);
    var d1 = new Neuron(150, -75);
    var d2 = new Neuron(150, -25);
    var d3 = new Neuron(150, 25);
    var d4 = new Neuron(150, 75);

    nn.connect(a1, b1,0.43);
    nn.connect(a1, b2,0.21);
    nn.connect(a1, b3,0.78);
    nn.connect(a1, b4,0.67);

    nn.connect(b1, c1,random(1));
    nn.connect(b1, c2,random(1));
    nn.connect(b1, c3,random(1));
    nn.connect(b1, c4,random(1));
    nn.connect(b1, c5,random(1));

    nn.connect(b2, c1,random(1));
    nn.connect(b2, c2,random(1));
    nn.connect(b2, c3,random(1));
    nn.connect(b2, c4,random(1));
    nn.connect(b2, c5,random(1));

    nn.connect(b3, c1,random(1));
    nn.connect(b3, c2,random(1));
    nn.connect(b3, c3,random(1));
    nn.connect(b3, c4,random(1));
    nn.connect(b3, c5,random(1));

    nn.connect(b4, c1,random(1));
    nn.connect(b4, c2,random(1));
    nn.connect(b4, c3,random(1));
    nn.connect(b4, c4,random(1));
    nn.connect(b4, c5,random(1));

    nn.connect(c1, d1,random(1));
    nn.connect(c2, d1,random(1));
    nn.connect(c3, d1,random(1));
    nn.connect(c4, d1,random(1));
    nn.connect(c5, d1,random(1));

    nn.connect(c1, d2,random(1));
    nn.connect(c2, d2,random(1));
    nn.connect(c3, d2,random(1));
    nn.connect(c4, d2,random(1));
    nn.connect(c5, d2,random(1));

    nn.connect(c1, d3,random(1));
    nn.connect(c2, d3,random(1));
    nn.connect(c3, d3,random(1));
    nn.connect(c4, d3,random(1));
    nn.connect(c5, d3,random(1));

    nn.connect(c1, d4,random(1));
    nn.connect(c2, d4,random(1));
    nn.connect(c3, d4,random(1));
    nn.connect(c4, d4,random(1));
    nn.connect(c5, d4,random(1));


    nn.addNeuron(a1);
    nn.addNeuron(b1);
    nn.addNeuron(b2);
    nn.addNeuron(b3);
    nn.addNeuron(b4);
    nn.addNeuron(c1);
    nn.addNeuron(c2);
    nn.addNeuron(c3);
    nn.addNeuron(c4);
    nn.addNeuron(c5);
    nn.addNeuron(d1);
    nn.addNeuron(d2);
    nn.addNeuron(d3);
    nn.addNeuron(d4);
}

function draw() {
    background("#fff");
  
    nn.updatenet();
    nn.display();
    if (frameCount % 30 == 0) {
        nn.feedforward(random(1));
    }
}

function Connection(from, to,w) {


    this.a = from;
    this.b = to;
    this.weight = w;
    this.sending = false;
    this.sender = null;
    this.output = 0;
    this.display = function() {
        
        stroke(200,200,200);
        strokeWeight(this.weight*5);
        line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);

        if (this.sending) {
        var m =  (this.b.position.y-this.a.position.y)/(this.b.position.x-this.a.position.x);
        var c = this.a.position.y-(m*this.a.position.x);
        stroke(255,0,0);
        strokeWeight(this.weight*2);
             var start_x = this.sender.x-(30*w);
             var start_y = (m*start_x)+c;
             var end_x = this.sender.x;
             var end_y = (m*end_x)+c;
             
             line(start_x, start_y, end_x,end_y );

            // fill("#d71419");
           // strokeWeight(0);
            //ellipse(this.sender.x, this.sender.y, w, w);
        }
    }
   

    this.feedforward = function(val) {
        this.output = val*this.weight;
        this.sender = this.a.position.copy();
        this.sending = true;
    }

    this.updatenet = function() {
        if (this.sending) {
            this.sender.x = lerp(this.sender.x, this.b.position.x, 0.1);
            this.sender.y = lerp(this.sender.y, this.b.position.y, 0.1);
            var d = p5.Vector.dist(this.sender, this.b.position);
            if (d < 1) {
                this.b.feedforward(this.output);
                this.sending = false;
            }
        }
    }
 

  
}

function Network(x, y) {

    this.neurons = [];
    this.connections = [];
    this.position = createVector(x, y);

    this.addNeuron = function(n) {
        this.neurons.push(n);
    }

    this.connect = function(a, b, weight) {
        var c = new Connection(a, b, weight);
        a.addConnection(c);
        this.connections.push(c);
    }

    this.feedforward = function(input) {
        var start = this.neurons[0];
        start.feedforward(input);
    }

    this.updatenet = function() {
        for (var i = 0; i < this.connections.length; i++) {
            this.connections[i].updatenet();
        }
    }

    this.display = function() {
        push();
        translate(this.position.x, this.position.y);
        for (var i = 1; i < this.neurons.length; i++) {
            this.neurons[i].display();
        }

        for (var i = 4; i < this.connections.length; i++) {
            this.connections[i].display();
        }
        pop();
    }
}

function Neuron(x, y) {

    this.position = createVector(x, y);
    this.connections = [];
    this.sum = 0.2;
    this.r = 32;

    this.addConnection = function(c) {
        this.connections.push(c);
    }

    this.feedforward = function(input) {
        this.sum += input;
        if (this.sum > 1) {
            this.fire();
            this.sum = 0.2;
        }
    }

    this.fire = function() {
        this.r = 64;

        for (var i = 0; i < this.connections.length; i++) {
            this.connections[i].feedforward(this.sum);
        }
    }

    this.display = function() {
        stroke(255);
        strokeWeight(0);
        var b = map(this.sum,0,1,255,175);
        fill(b);
        ellipse(this.position.x, this.position.y, this.r, this.r);

        this.r = lerp(this.r,32,0.1);
    }
}

