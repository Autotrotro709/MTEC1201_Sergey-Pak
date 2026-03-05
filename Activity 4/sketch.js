// Sergey Pak
// Wandering Eyes
// Move your mouse to make the eyes follow you.
// Click the mouse to make both pupils jump to a random position inside the eyes.
// Press any key to make the eyes “blink” (they shrink for a moment).
let eyeLeft = 150
let eyeRight = 350
let eyeY = 200;

let pupilOffsetX = 0;
let pupilOffsetY = 0;

let blinkSize = 80; // height of eyes
let isBlinking = false;

function setup() {
  createCanvas(700, 500);
}

function draw() 
{
  background(0);

  // CONDITIONALS FOR BLINKING
  if (isBlinking === true) 
  {
    blinkSize = 20; // small height when blinking
  } 
  
  else if (keyIsPressed) 
  {
    blinkSize = 40; // half blink when key is held
  } 
  
  else 
  {
    blinkSize = 80; // normal open eyes
  }

  // EYE OUTLINES
  fill(255);
  rect(eyeLeft, eyeY, 120, blinkSize, 10);
  rect(eyeRight, eyeY, 120, blinkSize, 10);

  // PUPIL MOVEMENT FOLLOWING MOUSE
  // pupils follow mouse but stay inside the eye
  let followX = map(mouseX, 0, width, -20, 20);
  let followY = map(mouseY, 0, height, -10, 10);

  // pupils use same offsets so they stay synchronized
  let finalPupilX = followX + pupilOffsetX;
  let finalPupilY = followY + pupilOffsetY;

  // DRAW PUPILS
  fill(0);
  ellipse(eyeLeft + 60 + finalPupilX, eyeY + blinkSize/2 + finalPupilY, 30, 30);
  ellipse(eyeRight + 60 + finalPupilX, eyeY + blinkSize/2 + finalPupilY, 30, 30);
}

function mousePressed() 
{
  // random synchronized movement inside the eye
  pupilOffsetX = random(-15, 15);
  pupilOffsetY = random(-8, 8);

}

function keyPressed() 
{
  // triggers blink
  isBlinking = true;
}

function keyReleased() 
{
  isBlinking = false;
}
