let looks = {};
let angle = 0;
let aster;
let spawnPoint;
let spawnCenter;
let spawnVector;

function setup() {
  createCanvas(400, 400);
  //noStroke();
  //noLoop();
  //frameRate(30);
  looks.bg = color(220, 220, 210);
  looks.roid = {
    fill: color(30, 30, 20)
  }
  fill(looks.roid.fill)
  let asteroids = [];
  aster = new Asteroid();
  //aster.spawn();

}

function oort() {
  // constantly updates a point in a circle outside the canvas where we can spawn asteroids. They are targeted at the center-ish.
  angle -= 0.01;
  let x = width/2+sin(angle) * 300;
  let y = height/2 + cos(angle) * 300;
  spawnPoint = createVector(x,y);
  spawnCenter = createVector(width/2, height/2);
  spawnVector = p5.Vector.sub(spawnPoint,spawnCenter);
  stroke(200,0,0);
  strokeWeight(0.4);
  line(spawnPoint.x, spawnPoint.y, spawnCenter.x, spawnCenter.y);
  noStroke();
}

function draw() {
  background(looks.bg);
  oort();
  text(angle,100,100);
  aster.show();
  stroke(0);
  strokeWeight(4);
    stroke(255);
    line(spawnPoint.x, spawnPoint.y, );
    stroke(0);
    point(spawnPoint.x, spawnPoint.y);
  noStroke();
}

function mouseClicked() {
  aster.spawn();
}

class Asteroid {
  constructor() {
    this.pos = createVector(100,100);
    this.speed = createVector(random(-.2,.2), random(-.2,.2));
    this.r = 0;
    this.angular = random(-.1,.1);
    this.mass = ceil(random(4, 9)); // hitpoints
    this.size = createVector(random(20, 30), random(20, 30));
    this.sides = ceil(random(4, 9));
    this.vert = [];
  }
  spawn() {
    // is there room in the array for asteroids
    // add one more if room
    this.pos.x = width/2;
    this.pos.y = width/2;
    this.speed = createVector(random(-2,2), random(2,-2));

    for (let i = 0.0; i < this.sides; i++) {
      const irregular = 1 + random(1);
      let j = (map(i, 0, this.sides, 0, 2 * PI));
      this.vert[i] = createVector(
        sin(j) * this.size.x * irregular,
        cos(j) * this.size.y * irregular
      )
    }
  }
  move() {
    this.r += this.angular;
    this.pos.x += .01;
    this.pos.y += 0.02;
    aster.die();
  }

  show() {
    aster.move()
    push();
    translate(this.pos.add(this.speed));
    rotate(this.r);
    beginShape();
    this.vert.map(v => {
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
    pop();
  }

  divide() {
    // make a smaller asteroid with the same number of sides, but divide the remaining hitpoints, with ceil(). 3 remaining hitpoint / 2 = ceil(1.5) = 2...
    // also send the asteroids in 15-30° direction away from the place where they exploded.
  }

  explode(){
    // shockwave that also affects the other asteroids and the ship. This shockwave is only when using the powerful weapon.
  }


  die() {
    //remove from array of asteroids
    let deadZoneX = this.size.x * 2;
    let deadZoneY = this.size.y * 2;
    if (
      this.pos.x < 0 - (deadZoneX)) {
      aster.spawn()
    };
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

class Asteroid2 {
  constructor() {
    this.props = {
      location: random([0, width, height]),
      position: createVector(sin(random(PI*2),cos(random(PI*2)))),
      speed,
      rotSpeed: random(-.1,.1),
      mass: ceil(random(4,9)),
      size: createVector(
        random(20,30),
        random(20,30)),
      verts: []
    }

    this.props.speed = () => {
      switch (this.props.location) {
        case 0:

        default:

      }
    }
  }
  spawn() {
    // is there room in the array for asteroids
    // add one more if room
    this.pos.x = width/2;
    this.pos.y = width/2;
    this.speed = createVector(random(-2,2), random(2,-2));

    for (let i = 0.0; i < this.sides; i++) {
      const irregular = 1 + random(1);
      let j = (map(i, 0, this.sides, 0, 2 * PI));
      this.vert[i] = createVector(
        sin(j) * this.size.x * irregular,
        cos(j) * this.size.y * irregular
      )
    }
  }
  move() {
    this.r += this.angular;
    this.pos.x += .01;
    this.pos.y += 0.02;
    aster.die();
  }

  show() {
    aster.move()
    push();
    translate(this.pos.add(this.speed));
    rotate(this.r);
    beginShape();
    this.vert.map(v => {
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
    pop();
    text(this.pos.x,100,100)
  }

  divide() {
    // make a smaller asteroid with the same number of sides, but divide the remaining hitpoints, with ceil(). 3 remaining hitpoint / 2 = ceil(1.5) = 2...
    // also send the asteroids in 15-30° direction away from the place where they exploded.
  }

  explode(){
    // shockwave that also affects the other asteroids and the ship. This shockwave is only when using the powerful weapon.
  }


  die() {
    //remove from array of asteroids
    let deadZoneX = this.size.x * 2;
    let deadZoneY = this.size.y * 2;
    if (
      this.pos.x < 0 - (deadZoneX)) {
      aster.spawn()
    };
  }
}