// Sergey Pak SS4 
// "The Living Eye"
// Eye passively blinks and follows mouse. Lmc makes eye jump randomly, keyboard key makes eye squint.

let pupilImg;

let eyeX = 300;
let eyeY = 200;

let pupilX = 0;
let pupilY = 0;

let targetPX = 0;
let targetPY = 0;

// 1 = fully open, 0 = fully closed
let blinkLid = 1;
let squintLid = 1;

let isBlinking = false;
let blinkStart = 0;

let squinting = false;
let squintStart = 0;

let nextBlinkTime = 0;

function preload() 
{
  pupilImg = loadImage("images/eye.png");
}

function setup() 
{
  createCanvas(600, 400);
  nextBlinkTime = millis() + random(2000, 5000);
}

function draw() 
{
  background(20);
  // Passive blink
  if (millis() > nextBlinkTime && !isBlinking) 
  {
    startBlink();
    nextBlinkTime = millis() + random(2000, 5000);
  }

  if (isBlinking=true) 
  {
    let t = (millis() - blinkStart) / 200.0;
    if (t < 0.5) 
    {
      blinkLid = 1 - t * 2;
    } 
    else if (t < 1) 
    {
      blinkLid = (t - 0.5) * 2;
    } 
    else 
    {
      blinkLid = 1;
      isBlinking = false;
    }
  }

  // Squint on key press
  if (squinting=true) 
  {
    let t = (millis() - squintStart) / 300.0;
    if (t < 0.5) 
    {
      squintLid = 1 - t * 0.4;     // 1 → 0.8
    } 
    else if (t < 1) 
    {
      squintLid = 0.8 + (t - 0.5) * 0.4; // 0.8 → 1
    } 
    else 
    {
      squintLid = 1;
      squinting = false;
    }
  }

  // Final lid openness: take the smaller of the two
  let lid = Math.min(blinkLid, squintLid);

  // Draw white of an eye
  fill(255);
  noStroke();
  ellipse(eyeX, eyeY, 300, 150);

  // Pupil movement
  let followX = map(mouseX, 0, width, -40, 40);
  let followY = map(mouseY, 0, height, -20, 20);

  pupilX = lerp(pupilX, targetPX + followX, 0.1);
  pupilY = lerp(pupilY, targetPY + followY, 0.1);

  // Limit pupil movement within eye shape
  let dx = pupilX;
  let dy = pupilY;
  
  // Normalize to ellipse radius
  let nx = dx / 120;
  let ny = dy / 60;
  
  // If outside ellipse, scale back in
  if (nx * nx + ny * ny > 1) 
  {
  let angle = atan2(dy, dx);
  pupilX = cos(angle) * 120;
  pupilY = sin(angle) * 60
  }

  imageMode(CENTER);
  image(pupilImg, eyeX + pupilX, eyeY + pupilY, 60, 60);

  // Eyelids
  fill(20);

  let topLidHeight = map(lid, 1, 0, 0, 75);
  rect(0, 0, width, topLidHeight);

  let bottomLidHeight = map(lid, 1, 0, 0, 75);
  rect(0, height - bottomLidHeight, width, bottomLidHeight);

  // Text
  fill(200);
  textSize(16);
  text("Click to make the eye jump. Press any key to squint.", 10, height - 20);
}

function mousePressed() 
{
  targetPX = random(-50, 50);
  targetPY = random(-25, 25);
}

function keyIsPressed() 
{
  startSquint();
}

function startBlink() 
{
  isBlinking = true;
  blinkStart = millis();
}

function startSquint() 
{
  squinting = true;
  squintStart = millis();
}
