let loc
let vel
let bob
let bobs
function setup(){
  console.log('reloaded')
  createCanvas(200,200)
  loc = createVector(10,10)
  bobs = []
  bobs = new Array(10)
  for (let i = 0; i < bobs.length; i++) {
    bobs[i]= new Bob()
  }
  //bob = new Bob()
}

function draw(){
  background(200)
  rect(loc.x, loc.y, 10, 10)
  bobs.map(bob => bob.show())
  //bob.show()
}

/*
// magnitude = length
// direction
*/

class Bob {
  constructor(){
    // this.velocity = createVector(random(-1,1),random(-1,1))
    this.velocity = createVector(random(5),0)
    this.loc = createVector(0,0)
    this.size = 30
  }

  move(){
    this.bounce()
    // if(this.loc.x > 100) {this.loc.set(0,0)}
    this.loc.add(this.velocity)
  }

  shade(){
    strokeWeight(0)
    fill(255,255,255,50)
  }

  bounce(){
    if ((this.loc.x > 50 || this.loc.x < -50)) {
      this.velocity.x = this.velocity.x * -1
      fill(255,0,0,50)
    }
  }

  show(){
    push()
    text(this.velocity.x, 10,40)
    text(nfc(this.loc.x,1), 10,60)

    this.shade()
    this.bounce()
    translate(width/2, height/2)
    this.move()
    rect(this.loc.x, this.loc.y, this.size,this.size)
    pop()
  }
}