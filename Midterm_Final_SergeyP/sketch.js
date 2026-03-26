//Midterm project Sergey Pak
//"Gates to... Hell(?)"
// You are in mysterious dark place, there are a few things you can actually see, tombstone, some pillars... and eyes from the dark.
// Eyes will follow your mouse. 
// Press mouse key to open/close tombstone and open one of the mysterious realms. 
// Press any keyboard key to reset the sketch.

let bacimg; //Background image I created myself
let cover; //Movable cover of a tombstone
let doodle;
let space;
let demon; //Three realms that tombstone lead to
let CurrentRealm; //Needed in drawRealm function later
let coverX; // Sets current position of cover on X axis
let trgtCoverx; //Where cover is supposed to move (needed for smooth movement)
let tombOpen = false; //Default condition needed for statement later

function setup() 
{
  CurrentRealm = random ([doodle, space, demon]); 
  coverX = 0;
  trgtCoverx = 0;
  createCanvas(1920, 1080);
}

function preload()
{
  bacimg = loadImage("images/backgroundimg.png");
  cover = loadImage ("images/cover.png");
  doodle = loadImage("images/doodlevoid.png");
  space = loadImage ("images/space.png");
  demon = loadImage ("images/jdemon.png");
  pupil = loadImage ("images/eye.png");
  white = loadImage ("images/white.png");
}

function draw() 
{
  background (0);
  drawRealm (680, 360, 680, 720);
  image(bacimg, 0, 0, 1920, 1080);
  image(cover, coverX, 0, 1920, 1080);
  coverX = coverX + (trgtCoverx - coverX)*0.1;
  eye(760, 160, 2);
  eye(1240, 560, 2.5);
  eye(1300, 100, 1/1.2);
  eye(120, 500, 1/1.1);
  eye(135, 120, 4);
  eye(350, 250, 1.3);
  eye(350, 80, 3.5);
  eye(270, 700, 2.3);
  eye(1700,520, 1);
  eye(1800,120, 3);
  eye(1680,320, 2);
  eye(1860,700, 3);
  textSize (60);
  fill ('red');
  textAlign(CENTER);
  text ("Abandon all hope, ye who enter here...", 960, 1050);
}

function eye(x, y, r)
{
  let eyeX = constrain(mouseX, x-1/r, x+120/r);
  let eyeY = constrain(mouseY, y-3/r, y+20/r);
  image(white, x, y, 200/r, 80/r);
  image(pupil, eyeX, eyeY, 60/r, 60/r);
}

function mousePressed()
{
  if (!tombOpen)
    {
      if (CurrentRealm === doodle)
        {
          CurrentRealm = random([space, demon]);
        }
      else if (CurrentRealm === space)
        {
          CurrentRealm = random([doodle, demon]);
        }
      else if (CurrentRealm === demon)
        {
          CurrentRealm = random([doodle, space]);
        }
      trgtCoverx=-300;
      tombOpen = true;
    }
    else 
      {
        trgtCoverx = 0;
        tombOpen = false;
      }
}

function drawRealm(x, y, w, h)
{
  if (CurrentRealm)
  {
    image(CurrentRealm, x, y, w, h);
  }
}

function keyPressed()
{
  CurrentRealm = doodle;
  coverX = 0;
  trgtCoverx = 0;
  tombOpen = false;
}