// ************************ GLOBAL VARIABLES *********************
  /* global createjs */
  /* global keyMonkey */
  /* global collisionGnome */

var myStage;
var stageWidth;
var stageHeight;
var myFrameRate = 24;
var character, background, scoreDisplay, theEnd;
var rotationSpeed = 3;
var speed = 10;

var walls = [];
var targets = [];
var enemies = [];
var level = [];

var score = 0;
var a,b,c,xpos,ypos;
var endSoundPlayed = false;



function preload(){
  var queue = new createjs.LoadQueue();
  createjs.Sound.alternateExtensions = ["mp3"];
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", init);
  queue.loadManifest([
    {id:"backgroundSound", src:"sounds/slowbackground.mp3"},
    {id:"eatSound1", src:"sounds/eat1.mp3", data:2},
    {id:"eatSound2", src:"sounds/eat2.mp3", data:2},
    {id:"eatSound3", src:"sounds/eat3.mp3", data:2},
    {id:"eatSound4", src:"sounds/eat4.mp3", data:2},
    {id:"eatSound5", src:"sounds/eat5.mp3", data:2},
    {id:"endSound", src:"sounds/endSound.mp3", data:2},
    {id:"edgeSound", src:"sounds/edgeSound.mp3", data:2}
    ]);
}


// ************ INITIALIZATION - Happens only once ****************
function init(){
  myStage = new createjs.Stage(document.getElementById("myCanvas"));
    stageWidth = myStage.canvas.width;
    stageHeight = myStage.canvas.height;

  // generateStars(500);
  // generateTargets(10); 

  background = new createjs.Bitmap("images/bg.png");
  myStage.addChild(background);

  character = new createjs.Bitmap("images/hero.png");
  character.regX = character.regY = 64;
  character.x = stageWidth / 2;
  character.y = stageHeight - 64;
  character.scaleX = character.scaleY = 0.5;
  character.speed = {"up": speed,"down": speed,"left":speed,"right":speed};
  myStage.addChild(character);

  collisionGnome.addCollider(character, 1.0);
  collisionGnome.setStage(myStage);
  // collisionGnome.setDebug(true);

  scoreDisplay = new createjs.Text("SCORE: " + score, "48px Courier");
  scoreDisplay.x = stageWidth - 50;
  scoreDisplay.y = stageHeight - 64;
  scoreDisplay.textAlign = "right";
  scoreDisplay.textBaseline = "middle";
  myStage.addChild(scoreDisplay);

  theEnd = new createjs.Text("THE END", "144px Courier");
  theEnd.x = stageWidth / 2;
  theEnd.y = stageHeight / 2;
  theEnd.textAlign = "center";
  theEnd.textBaseline = "middle";
  theEnd.alpha = 0.;
  myStage.addChild(theEnd);

  createjs.Sound.play("backgroundSound");

  createjs.Ticker.addEventListener('tick', gameLoop);
  createjs.Ticker._setFPS(myFrameRate);
  
  loadLevel(0);
}

// ***************** THE MAIN LOOP ******************
function gameLoop(evt){
  // put code in here that will change every 'tick'
  handleKeyInput();
  handleCollisions();
  runLevels();
  endCheck();
  myStage.update();
}


// ************* Various self-defined functions *************
 function runLevels(){
   for(var i=0;i<level.length;i++){
     if(level[i].active){
       level[i].completionCheck();
     }
   }
 }
 

// to do: level define pre-level display
// an array with n number of pre-level display screens
// for each define image, xy location, timer vs on-click vs key input, and duration if timer or key if key input

  /////////////////////////////
 //      DEFINE LEVELS     //
////////////////////////////

level[0] = 
  { preLevelDisplay : [
    {img: "images/level1_predisplay1.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay2.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay3.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "onClick"}],
  
     // x = wall, t = target, e = enemy, c = character start location
    layout : [
     ["x", "x", "x", "x", "x", " ", " ", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
     ["x", " ", " ", " ", " ", " ", "t", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", " ", "t", " ", " ", " ", " ", " ", " ", " ", "e", " ", " ", " ", "x"],
     ["x", " ", " ", " ", " ", "t", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", " ", " ", " ", " ", " ", "x", "x", "x", " ", " ", " ", "x"],
     ["x", " ", " ", "t", " ", " ", " ", "t", " ", " ", " ", "x", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "t ", " ", " ", " ", " ", " ", " ", "x", " ", " ", " ", "x"],
     ["x", " ", "t", " ", " ", " ", " ", " ", " ", " ", "e", "x", " ", " ", " ", "x"],
     ["x", " ", "t", " ", " ", " ", "x", "x", "x", "x", "x", "x", " ", "e", " ", "x"],
     ["x", " ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", "x", "x", "x", "x", "x", "x", " ", " ", " ", "x", "x", "x", "x", "x", "x"]], 
   
   
    enemyMovementStyle : "randomWallBounce",

    completionCheck : function() {
      if(character.y <= 0){
        console.log("level 0 complete");
        level[0].active = false;
        loadLevel(1)
      }
    }
  }



// Create the level from the level data grid in create
function loadLevel (m) {
  walls = [];
  targets = [];
  enemies = [];
  
    for (var i = 0; i < level[m].layout.length; i++) {
        for (var j = 0; j < level[m].layout[i].length; j++) {
            if (level[m].layout[i][j] === "x") { 
                // Create a wall and add it to the 'walls' group
                var wall = new createjs.Bitmap("images/box_yellow.png");
                wall.x = 64*j;
                wall.y = 64*i;
                collisionGnome.addCollider(wall, 1.0);
                walls.push(wall);

            } else if (level[m].layout[i][j] === "t") { 
                // Create a coin and add it to the 'targets' group
                var target = new createjs.Bitmap("images/box_green.png");
                target.x = 64*j;
                target.y = 64*i;
                collisionGnome.addCollider(target, 1.0);
                targets.push(target);

            } else if (level[m].layout[i][j] === "h") { 
                // Create a enemy and add it to the 'enemies' group
                var enemy = new createjs.Bitmap("images/box_orange.png");
                enemy.x = 64*j;
                enemy.y = 64*i;
                collisionGnome.addCollider(enemy, 1.0);
                enemies.push(enemy);

            }
        }
    }

  display(walls);
  display(targets);
  display(enemies);
  display(character);
  
  myStage.setChildIndex( scoreDisplay, myStage.numChildren-1);
  
  level[m].active = true;

}


function display(object){
  if(object.constructor === Array){
    for(var i=0; i<object.length; i++){
      myStage.addChild(object[i]);
    }
  }
  else{
    myStage.addChild(object);
  }
}


function generateTargets(num){
  // create any number of targets
  for(var i=0;i<num;i++){
    var target = new createjs.Bitmap("images/target.png");
    target.scaleX = target.scaleY = Math.min(Math.max(Math.random(), 0.3), 1);
    target.rotation = 360 * Math.random();

    // call this function until we get a locations within bounds of circle
    while(targetLocator());

    target.x = xpos;
    target.y = ypos;

    targets[i]= target;
    collisionGnome.addCollider(targets[i], 0.5);
    myStage.addChild(target);
  }	
}

function targetLocator(){
    // generate locations within bounds of circle
  xpos = Math.random() * stageWidth;
  ypos = Math.random() * stageHeight;

  a = (stageWidth/2) - xpos;
  b = (stageHeight/2) - ypos;
  c = Math.sqrt( a*a + b*b );

  if (c > 450) { return true;}
  else { return false;}
}

function handleKeyInput(){
  // allow key strokes to control movement
  if(keyMonkey["w"] || keyMonkey["up"]) 		{ character.y -= character.speed.up; }
  if(keyMonkey["a"] || keyMonkey["left"]) 	{ character.x -= character.speed.left; }
  if(keyMonkey["s"] || keyMonkey["down"]) 	{ character.y += character.speed.down; }
  if(keyMonkey["d"] || keyMonkey["right"]) 	{ character.x += character.speed.right; }

}

function handleCollisions(){
  // check to see if there are any collisions with any of the targets
  for(var i=0;i<targets.length;i++){
    if(character.collidesWith(targets[i])){
      // remove it from the array
      myStage.removeChild(targets[i]);
      targets.splice(i, 1);
      score++;
      scoreDisplay.text = "SCORE: " + score;
      createjs.Sound.play("target_collide");
    }
  }
  
  
  // check to see if there are any collisions with any of the targets
  
  character.speed = {"up": speed,"down": speed,"left":speed,"right":speed};
  
  for(var i=0;i<walls.length;i++){
    if(character.collidesWith(walls[i])){
      // if character is below wall
      if(character.y > walls[i].y){
        character.speed.up = 0;
        console.log("up = 0");
      }
      if (character.y < walls[i].y){
        character.speed.down = 0;
        console.log("down = 0");
      }
     if (character.x > walls[i].x){
        character.speed.left = 0;
        console.log("left = 0");
      }
    if (character.x < walls[i].x){
        character.speed.right = 0;
        console.log("right = 0");
      }
    }

    
      

        
        
      createjs.Sound.play("wall_collide");
    }
}
  






function playEatSounds(){  
    var i = Math.floor((Math.random()*5));
    var x; 
    switch(i){
      case 0:
        x="eatSound1";
        break;
      case 1:
        x="eatSound2";
        break;
      case 2:
        x="eatSound3";
        break;
      case 3:
        x="eatSound4";
        break;
      case 4:
        x="eatSound5";
        break;
    }
  createjs.Sound.play(x);  // Play the sound that corresponds to the random number!
}

function endCheck(){
  // if all targets are gone, display end text and don't allow score to reset
  if(targets.length == 0){
    theEnd.arrived = true;
    theEnd.alpha = 1.0;
  }
  if (theEnd.arrived == true && endSoundPlayed == false){
    createjs.Sound.play("endSound");
    endSoundPlayed = true;
  }
}