# Anakataroids
Asteroids in p5.js. They can come from any direction, so.. anakataroids.

Will propbably never be a real game. Just making a thing for my self, to learn. I'll add in stuff at semirandom intervals.

The asteroids will respawn when they go off screen, or when you click the mouse.

## How to run it?
I use the 'live p5 panel' inside Visual Studio Code. You can copy the code and paste it in the [editor](http://editor.p5js.org/) at p5js.org, or you can open index.html in your browser.

## Here be dragons
I have a tendency to overcomplicate stuff, so some code might be wonky. if you want to point me in the right direction, ping me or raise an issue :)

## What have I learned
the asteroids were not drawn correctly. There was some overlapping paths creating some boolean operations. I thought initially that I did somethignwrong when i called this.sides in the for loop, in essence making a new number of sides for the asteroids, since the asteroid was drawn with extra number of points. After a large amount of console.logs, I realised that i had to reset the vert array after I had drawn the shape. The previous shape was in the array.

The oort() function was the easiest way to spawn asteroids outside the canvas. Instead of doing an if else or sweitch to see if the spawn point was outside the canvas, I decided to use a sin(), cos() to make a rotating point outside the canvas to use a s the spawn point.

I decided to build the oort function with a sine-cos circle since that is the same thing that draws the asteroids.

The asteroids are drawn from 0 degrees to TWO_PI, and the sides are drawn with a for loop iterating over them. Every vsalue of 'i' is mapped from 0 -> PI * 2 so I get radians for a circle. The coords are then modified slightly to create an irregular shape, and stored in the vert-array for drawing in the show()-method.