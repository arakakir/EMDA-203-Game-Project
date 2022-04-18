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

  background = new createjs.Bitmap("images/bg.png");
  myStage.addChild(background);

  character = new createjs.Bitmap("images/hero.png");
  character.regX = character.regY = 64;
  character.x = stageWidth / 2;
  character.y = stageHeight - 64;
  character.startPosition = {x: 0, y: 0};
  character.scaleX = character.scaleY = 0.4;
  character.speed = {"up": speed,"down": speed,"left":speed,"right":speed};
  myStage.addChild(character);

  collisionGnome.addCollider(character, 1.0);
  collisionGnome.setStage(myStage);
  //collisionGnome.setDebug(true);

  scoreDisplay = new createjs.Text("SCORE: " + score, "48px Courier");
  scoreDisplay.x = stageWidth - 50;
  scoreDisplay.y = stageHeight - 32;
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
  myStage.update();
}


 

  /////////////////////////////
 //      DEFINE LEVELS     //
////////////////////////////

level[0] = 
  { preLevelDisplay : [
    {img: "images/level1_predisplay1.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay2.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay3.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "onClick"}],
  
  
    backgroundImage : "images/bg.png",
  
     // x = wall, t = target, e = enemy, c = character start location
    layout : [
     ["x", "x", "x", "x", "x", " ", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
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
     ["x", "x", "x", "x", "x", "x", "x", " ", "c", " ", "x", "x", "x", "x", "x", "x"]], 
   
   
    enemyMovementStyle : "randomWallBounce",

    completionCheck : function() {
      if(character.y <= 0){
        console.log("level 0 complete");
        level[0].active = false;
        loadLevel(1)
      }
    }
  }


level[1] = 
  { preLevelDisplay : [
    {img: "images/level1_predisplay1.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay2.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay3.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "onClick"}],
  
     // x = wall, t = target, e = enemy, c = character start location
    layout : [
     ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
     [" ", " ", " ", " ", "x", " ", "t", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "x", "x", "x", " ", " ", " ", " ", " ", " ", "e", " ", " ", " ", "x"],
     ["x", " ", "x", " ", " ", "t", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", " ", " ", " ", " ", " ", "x", "x", " ", " ", " ", " ", "x"],
     ["x", " ", " ", "t", " ", " ", " ", "t", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "x", " ", " ", " ", " ", " ", "e", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "x", " ", " ", " ", "x", "x", "x", " ", " ", "e", " ", "x"],
     ["x", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", "x", "x", "x", "x", "c", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]], 
   
   
    enemyMovementStyle : "randomWallBounce",

    completionCheck : function() {
      if(character.x <= 0){
        console.log("level 0 complete");
        level[1].active = false;
        clearScreen();
        loadLevel(2)
      }
    }
  }

level[2] = 
  { preLevelDisplay : [
    {img: "images/level1_predisplay1.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay2.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "timer", duration: 3000},
    {img: "images/level1_predisplay3.png", loc: {x: stageWidth/2, y: stageHeight/2}, toEnd: "onClick"}],
  
     // x = wall, t = target, e = enemy, c = character start location
    layout : [
     ["x", "x", "x", "x", "x", " ", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"],
     ["x", " ", " ", " ", "x", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", "c"],
     ["x", " ", "x", "x", "x", " ", "x", " ", " ", " ", " ", "e", " ", " ", " ", "x"],
     ["x", " ", "x", " ", "x", "t", "x", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", " ", " ", " ", " ", " ", "x", "x", " ", " ", " ", " ", "x"],
     ["x", " ", " ", "t", " ", " ", " ", "t", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "x", "x", "x", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "x", " ", " ", " ", " ", " ", "e", " ", " ", " ", " ", "x"],
     ["x", " ", "t", " ", "x", " ", " ", " ", "x", "x", "x", " ", " ", "e", " ", "x"],
     ["x", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
     ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]], 
   
   
    enemyMovementStyle : "randomWallBounce",

    completionCheck : function() {
      if(character.y <= 0){
        console.log("level 0 complete");
        level[2].active = false;
        clearScreen();
        loadLevel(0)
      }
    }
  }


// Create the level from the level data grid in create
function loadLevel (m) {
  // remove children
  clearScreen();
  
 // Display pre-level images (if any)
  // for (var i = 0; i < level[m].preLevelDisplay.length; i++){
  //   // display one image
     var preLevelImage = new createjs.Bitmap(level[m].preLevelDisplay[i])
     preLevelImage.x = level[m].preLevelDisplay[i].loc.x;
     preLevelImage.y = level[m].preLevelDisplay[i].loc.x;
  // }
  
  
  
  // Display background image
  
  
  
  // Load in the level layout
  walls = [];
  targets = [];
  enemies = [];
  
    for (var i = 0; i < level[m].layout.length; i++) {
        for (var j = 0; j < level[m].layout[i].length; j++) {
            if (level[m].layout[i][j] === "x") { 
                // Create a wall and add it to the 'walls' group
                var wall = new createjs.Bitmap("images/box_yellow.png");
                wall.x = 64*j + 32;
                wall.y = 64*i + 32;
                collisionGnome.addCollider(wall, 1.0);
                walls.push(wall);

            } else if (level[m].layout[i][j] === "t") { 
                // Create a coin and add it to the 'targets' group
                var target = new createjs.Bitmap("images/box_green.png");
                target.x = 64*j + 32;
                target.y = 64*i + 32;
                collisionGnome.addCollider(target, 1.0);
                targets.push(target);

            } else if (level[m].layout[i][j] === "e") { 
                // Create a enemy and add it to the 'enemies' group
                var enemy = new createjs.Bitmap("images/box_orange.png");
                enemy.x = 64*j + 32;
                enemy.y = 64*i + 32;
                collisionGnome.addCollider(enemy, 1.0);
                enemies.push(enemy);
              
            } else if (level[m].layout[i][j] === "c") { 
                // set the character start position
                character.x = 64*j + 32;
                character.y = 64*i + 32;
                character.startPosition = {x: character.x, y: character.y};

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


// ************* Various self-defined functions *************
 function runLevels(){
   for(var i=0;i<level.length;i++){
     if(level[i].active){
       level[i].completionCheck();
     }
   }
 }


function clearScreen(){
  myStage.removeAllChildren();
  myStage.addChild(background, character, scoreDisplay);
  myStage.update();
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


function handleKeyInput(){
  // allow key strokes to control movement
  if(keyMonkey["w"] || keyMonkey["up"]) 		{ character.y -= character.speed.up; handleWallCollisions("up");}
  if(keyMonkey["a"] || keyMonkey["left"]) 	{ character.x -= character.speed.left; handleWallCollisions("left");}
  if(keyMonkey["s"] || keyMonkey["down"]) 	{ character.y += character.speed.down; handleWallCollisions("down");}
  if(keyMonkey["d"] || keyMonkey["right"]) 	{ character.x += character.speed.right; handleWallCollisions("right");}
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
  
    for(var i=0;i<enemies.length;i++){
      if(character.collidesWith(enemies[i])){
        // remove it from the array
        myStage.removeChild(enemies[i]);
        enemies.splice(i, 1);
        score--;
        character.x = character.startPosition.x;
        character.y = character.startPosition.y;
        scoreDisplay.text = "SCORE: " + score;
        createjs.Sound.play("enemy_collide");
      }
    }
}
  
  
// check to see if there are any collisions with any of the walls
function handleWallCollisions(direction){
  character.speed = {"up": speed,"down": speed,"left":speed,"right":speed};
  
  for(var i=0;i<walls.length;i++){
    if(character.collidesWith(walls[i])){
      // if character is below wall set up speed to 0
      if(character.y > walls[i].y && direction == "up"){
        character.speed.up = 0;
        character.y = walls[i].y + 64;
      }
      if (character.y < walls[i].y && direction == "down"){
        character.speed.down = 0;
        character.y = walls[i].y - 64;
      }
      if (character.x > walls[i].x && direction == "left"){
        character.speed.left = 0;
        character.x = walls[i].x + 64;
      }
      if (character.x < walls[i].x && direction == "right"){
        character.speed.right = 0;
        character.x = walls[i].x - 64;
      }
    }

        
      createjs.Sound.play("wall_collide");
    }
}
  
