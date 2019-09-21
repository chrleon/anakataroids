let looks = {};
let angle = 0;
let aster;
let ship;
let asteroids;
let spawnPoint;
let debug = "Click to make asteroid";
let trajectory;
let aim;

function setup() {
  randomSeed(1618);
  createCanvas(400, 400);
  looks = {
    bg: color(20, 20, 30),
    roid: {
      fill: color(30, 20, 20),
    }
  }

  aim = createVector();
  trajectory = createVector();
  spawnPoint = createVector();

  asteroids = [];
  aster = new Asteroid();
  ship = new Ship();
  oort();
  aster.spawn();

}

function oort() {
  // constantly updates a point in a circle outside the canvas where we can spawn asteroids. They are targeted at the center-ish.
  // Need to calculate the vector from the point in the oort to the center.
  angle -= 0.01;

  // define the radius for the oort cloud, aka the spawn point
  let x = width / 2 + sin(angle) * 100;
  let y = height / 2 + cos(angle) * 100;
  spawnPoint.set(x,y);
  aim.set(width/2,height/2);
  noStroke();
}

function draw() {
  background(looks.bg);
  oort();
  ship.show();
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

    this.render = {
      fill: color(0,0,0),
      stroke: color(200,255,200,70),
      strokeWeight: 1
    }

  }

  spawn() {
    this.vert = []; // clear the vertices array
    this.size = createVector(
      random(30,50),
      random(50,80));
    this.mass = ceil(random(13, 30)); // hitpoints
    this.speed =
      createVector(
        random(-0.5, 0.5),
        random(-0.5, 0.5),

       );
    this.angular = random(-.04,.04);
    this.acceleration = createVector(0,0);
    this.pos = spawnPoint.copy();

    this.sides = int(random(9,12));
    // this.sides = int(random(32,48));
    for (let i = 0; i <= this.sides; i++) {
      let j = map(i, 0, this.sides, 0, 2*PI, true);
      this.vert[i] = createVector(
        sin(j) * this.size.x * random(.6,1.0),
        cos(j) * this.size.y * random(.6,1.0)
      );
    }
  }

  shade() {
    fill(this.render.fill);
    stroke(this.render.stroke);
    strokeWeight(this.render.strokeWeight);
  }

  move() {
    this.r += this.angular;
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    this.die();
  }

  show() {
    this.move()
    this.explode();
    push();
    this.shade();
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
    fill(255,255,255,0);
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
    this.acc = 0
    this.speed = 0
    this.inertia = 1
    this.mass = 4
    this.pos = createVector(width/2,width/2)
    this.roll = 0;
    this.rollSpeed = 0;
    this.render = {
      fill: color(0,0,0),
      stroke: color(255,255,255,120),
      strokeWeight: 1,
      engine: color(200,200,0,120),
    }
  }
  fire(){
    }

  move(){
    if (this.acc > 3) {this.acc = 3}
    // lag en ny variabel som tar inn i seg
    // rotasjonen slik at vi vet hvor skipet peker
    // deretter kan vi slenge det i den retningen
    let newPos = p5.Vector.fromAngle(radians(this.roll), this.acc)
    this.pos.add(newPos)
    this.pos.add(this.acc)

    this.exhaust();
  }

  exhaust(){
    if (this.acc > 0) {
      push()
      translate(this.pos.x, this.pos.y)
      rotate(this.roll);
      fill(this.render.engine)
      fill(255)
      if(keyIsPressed) {
        triangle(-3,7, 3,7, 0, 30)
      }
      pop()
    }
  }

  turn(){
    this.roll -= this.rollSpeed;
  }

  shade() {
    fill(this.render.fill);
    stroke(this.render.stroke);
    strokeWeight(this.render.strokeWeight);
  }

  build(){
    quad(0,-12, 10,12,0,7,-10,12)
  }

  show(){
    this.move()
    push()
    translate(this.pos.x, this.pos.y)
    this.turn()
    rotate(this.roll)
    this.shade()
    this.build()
    pop()
    push()
    fill(255)
    text(this.roll, 20,20)
    pop()
  }
  aim(){}
}

class Laser {
  constructor(){

  }
  move(){}
  hit(){}
}

// set position to a point on a circle outside the canvas

function keyPressed() {

  switch (keyCode) {
    case 32: // space
      ship.fire();
      break;
    case LEFT_ARROW:
      ship.rollSpeed = 0.1;
      break;
    case RIGHT_ARROW:
      ship.rollSpeed = -0.1;
      break;
    case UP_ARROW:
      ship.acc += 0.1;
      break;
    case SHIFT:
      ship.move();
      break;
  }
  return false
}

function keyReleased() {
  ship.rollSpeed = 0;
}