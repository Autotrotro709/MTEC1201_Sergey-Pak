//Final project Sergey Pak
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
let eyes = [];
let CurrentRealm; // Needed in drawRealm function later
let coverX; // Sets current position of cover on X axis
let trgtCoverx; // Where cover is supposed to move (needed for future function)
let tombOpen = false; // Default condition needed for statement later
let tombSound;
let spaceSound;
let doodleSound;
let demonSound;
let ambience;

// Instead of writing separate function for an eye, I decided to create class for it.
class Eye
{
  constructor(x,y,r)
  {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  display()
  {
    let eyeX = constrain(mouseX, this.x - 1/this.r, this.x + 120/this.r);
    let eyeY = constrain(mouseY, this.y - 3/this.r, this.y + 20/this.r);
    image (white, this.x, this.y, 200/this.r, 80/this.r);
    image (pupil, eyeX, eyeY, 60/this.r, 60/this.r);
  }
}

function setup() 
{
  //Needed for further condition statement to work properly
  CurrentRealm = random ([doodle, space, demon]); 
  coverX = 0;
  trgtCoverx = 0;
  createCanvas(1920, 1080);
  eyes.push(new Eye(760, 160, 2));
  eyes.push(new Eye(1240, 560, 2.5));
  eyes.push(new Eye(1300, 100, 1/1.2));
  eyes.push(new Eye(120, 500, 1/1.1));
  eyes.push(new Eye(135, 120, 4));
  eyes.push(new Eye(350, 250, 1.3));
  eyes.push(new Eye(350, 80, 3.5));
  eyes.push(new Eye(270, 700, 2.3));
  eyes.push(new Eye(1700,520, 1));
  eyes.push(new Eye(1800,120, 3));
  eyes.push(new Eye(1680,320, 2));
  eyes.push(new Eye(1860,700, 3));
  ambience.loop();
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
  //Sound effects and ambience
  tombSound = loadSound ("sounds/tombsound.mp3");
  spaceSound = loadSound ("sounds/spacesound.mp3");
  doodleSound = loadSound ("sounds/doodlesound.mp3");
  demonSound = loadSound ("sounds/demonsound.mp3");
  ambience = loadSound ("sounds/ambience.mp3")
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

  //Text that references to Gates of Hell
  textSize (60);
  fill ('red');
  textAlign(CENTER);
  text ("Abandon all hope, ye who enter here...", 960, 1050);
  
  //Checks in with every eye in array
  for (let i = 0; i < eyes.length; i++)
    {
      eyes[i].display();
    }
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

      //Plays a tomb cover sound opening and activates function which plays current realm ambience.
      tombSound.play();
      playCurrentRealmSound();
    }
    else 
      {
        //Turns cover of tomb back, and changes condition of tombstone back to false.
        trgtCoverx = 0;
        tombOpen = false;

        //Plays sound of closing tomb (same sound as opening) and uses function to stop any ambience.
        tombSound.play();
        stopRealmSounds();
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

//Function that helps identify what ambience play depending on the realm behind the tomb.
function playCurrentRealmSound()
{
  ambience.stop();

  if (CurrentRealm === space)
    {
      spaceSound.loop();
    }
  else if (CurrentRealm === doodle)
    {
      doodleSound.loop();
    }
  else if (CurrentRealm === demon)
    {
      demonSound.loop();
    }
}

//function helps to stop ambience of a realm once it's closed.
function stopRealmSounds ()
{
  ambience.loop();
  spaceSound.stop();
  doodleSound.stop();
  demonSound.stop();
}

//Reset button... Not a lot to reset, but at least something.
function keyPressed()
{
  CurrentRealm = random ([doodle, space, demon]);
  coverX = 0;
  trgtCoverx = 0;
  tombOpen = false;
  stopRealmSounds();
}