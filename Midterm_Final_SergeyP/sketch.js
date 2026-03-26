//Midterm project Sergey Pak
//"Gates to... Hell(?)"
// You are in mysterious dark place, there are a few things you can actually see, tombstone, some pillars... and eyes from the dark.
// Eyes will follow your mouse. 
// Press mouse key to open/close tombstone and open one of the mysterious realms. 
// Press any keyboard key to reset the sketch.

let bacimg; 
let cover; 
let doodle;
let space;
let demon; 
let CurrentRealm; //Needed in drawRealm function later
let coverX; // Sets current position of cover on X axis
let trgtCoverx; //Where cover is supposed to move (needed for future function)
let tombOpen = false; //Default condition needed for statement later

function setup() 
{
  //Needed for further condition statement to work properly
  CurrentRealm = random ([doodle, space, demon]); 
  coverX = 0;
  trgtCoverx = 0;
  createCanvas(1920, 1080);
}

function preload()
{
  bacimg = loadImage("images/backgroundimg.png");
  cover = loadImage ("images/cover.png");
  //Three realms that tombstone lead to
  doodle = loadImage("images/doodlevoid.png");
  space = loadImage ("images/space.png");
  demon = loadImage ("images/jdemon.png");
  //Parts for eyes
  pupil = loadImage ("images/eye.png");
  white = loadImage ("images/white.png");
}

function draw() 
{
  background (0);
  //Custom function, for more comfortable and clean switch between realms.
  drawRealm (680, 360, 680, 720); 
  //Background image I created myself
  image(bacimg, 0, 0, 1920, 1080);
  //Movable cover of a tombstone
  image(cover, coverX, 0, 1920, 1080);
  //Function that makes cover of a tombstone smoother
  coverX = coverX + (trgtCoverx - coverX)*0.1;
  //A lot of eyes that used custom function for eyes specifically
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
  //Text that references to Gates of Hell
  textSize (60);
  fill ('red');
  textAlign(CENTER);
  text ("Abandon all hope, ye who enter here...", 960, 1050);
}

//Eyes Function
function eye(x, y, r)
{
  //Make pupils not go out of white part. I did fail a bit tho.
  //Since I was working with ellipses before, which worked perfect. 
  // But java considers images as squares, so they are not perfectly alligned now.
  let eyeX = constrain(mouseX, x-1/r, x+120/r);
  let eyeY = constrain(mouseY, y-3/r, y+20/r);
  image(white, x, y, 200/r, 80/r);
  image(pupil, eyeX, eyeY, 60/r, 60/r);
}

function mousePressed()
{
  //Condition statement that defines what to do in case tombstone is opened or closed. 
  if (!tombOpen)
    {
      //Condition statement inside of condition statement.
      // Was made this way to make randomizer not repeat the same realm several times. 
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
        //Shifts Tombstone 300 pixels to the left
        //Changes Tomb's state to open
      trgtCoverx=-300;
      tombOpen = true;
    }
    else 
      {
        //Turns cover of tomb back, and changes condition of tombstone back to false.
        trgtCoverx = 0;
        tombOpen = false;
      }
}

//Function that draw realm behind the tomb
//Was made to comfortably make random switches between realms.
function drawRealm(x, y, w, h)
{
  if (CurrentRealm)
  {
    image(CurrentRealm, x, y, w, h);
  }
}

//Reset button... Not a lot to reset, but at least something.
function keyPressed()
{
  CurrentRealm = random ([doodle, space, demon]);
  coverX = 0;
  trgtCoverx = 0;
  tombOpen = false;
}