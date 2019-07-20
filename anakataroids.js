let looks = {};
let angle = 0;
let aster;
let asteroids;
let spawnPoint;
let debug = "Click to make asteroid";
let trajectory;
let aim;

function setup() {
  randomSeed(1618);
  createCanvas(400, 400);
  looks.bg = color(220, 220, 210);
  looks.roid = {
    fill: color(30, 30, 20)
  }
  fill(looks.roid.fill)

  aim = createVector();
  trajectory = createVector();
  spawnPoint = createVector();

  asteroids = [];
  aster = new Asteroid();
  oort();
  aster.spawn();

}

function oort() {
  // constantly updates a point in a circle outside the canvas where we can spawn asteroids. They are targeted at the center-ish.
  // Need to calculate the vector from the point in the oort to the center.
  angle -= 0.01;

  // define the radius for the oort cloud, aka the spawn point
  let x = width / 2 + sin(angle) * 50;
  let y = height / 2 + cos(angle) * 50;
  spawnPoint.set(x,y);
  aim.set(width/2,height/2);
  noStroke();
}

function draw() {
  background(looks.bg);
  oort();
  aster.show();
  text(debug, 10, 20);
}

function mouseClicked() {
  aster.spawn();
}

class Asteroid {
  constructor() {
    this.angular = 0;
    this.mass = 0; // hitpoints
    this.pos = 0;
    this.r = 0;

    this.speed = 0;
    this.vert = [];
  }

  spawn() {
    this.sides = random([4,5,6,7,8,9]);
    this.vert = []; // clear the vertices array
    this.size = createVector(
      random(30,50),
      random(50,80));
    this.mass = ceil(random(13, 30)); // hitpoints
    this.angular = random(-.04,.04);
    this.pos = spawnPoint.copy();

    this.sides = int(random(12,17));
    for (let i = 0; i <= this.sides; i++) {
      let j = map(i, 0, this.sides, 0, 2*PI, true);
      this.vert[i] = createVector(
        sin(j) * this.size.x * random(.6,1.0),
        cos(j) * this.size.y * random(.6,1.0)
      );
    }
  }
  move() {
    this.r += this.angular;
    this.pos.x += 0.1;
    this.pos.y += 0.2;
    aster.die();
  }

  show() {
    aster.move()
    aster.explode();
    fill(0);
    push();
    translate(this.pos.add(this.speed));
    rotate(this.r);
    // set vertex 0 == to last vertex
    let last = this.vert.length-1;
    this.vert[last] = this.vert[0];

    beginShape();
    this.vert.map((v) => {
      vertex(v.x, v.y);
    });

    endShape();
    noStroke();
    fill(0)
    pop();
  }

  divide() {
    // make a smaller asteroid with the same number of sides, but divide the remaining hitpoints, with ceil(). 3 remaining hitpoint / 2 = ceil(1.5) = 2...
    // also send the asteroids in 15-30° direction away from the place where they exploded.
    // kan dele array i to? og bare modifisere?
    // evt lage an asteroide med to arrays og skille de
  }

  explode(){
    // shockwave that also affects the other asteroids and the ship. This shockwave is only when using the powerful weapon.
    fill(255,255,255,100);
    ellipse(this.pos.x,this.pos.y, 150,150);
  }


  die() {
    //remove from array of asteroids
    let deadZoneX = this.size.x * 2;
    let deadZoneY = this.size.y * 2;
    if (
      this.pos.x < 0 - (deadZoneX) ||
      this.pos.x > width + deadZoneX ||
      this.pos.y < 0 - (deadZoneY) ||
      this.pos.y > height + deadZoneY

      ) {
      aster.spawn()
    }
  }
}



class Ship {
  constructor(){
  }
  fire(){}
  move(){}
  show(){}
  aim(){}
}

class Laser {
  constructor(){

  }
  move(){}
  hit(){}
}

// set position to a point on a circle outside the canvas

