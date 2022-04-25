// ************************ GLOBAL VARIABLES *********************
  /* global createjs */
  /* global keyMonkey */
  /* global collisionGnome */


// to make it complete:
// sounds
// moving enemies

var myStage, stageWidth, stageHeight;
var myFrameRate = 24;
var character, background, scoreDisplay, theEnd, backgroundSound, endGoal;
var speed = 10;
var enemySpeed = 2;
var currentLevel;

var score = 0;

var walls = [];
var targets = [];
var enemies = [];
var level = [];
var backgroundImages = [];
var objectsToMove = [];



// ************************* PRELOAD ASSETS ***************************

function preload(){
  var queue = new createjs.LoadQueue(false);
  createjs.Sound.alternateExtensions = ["mp3"];
  queue.installPlugin(createjs.Sound);
  queue.on("complete", init);
  queue.loadManifest([
    {id:"backgroundSound", src:"sounds/soundtrack.mp3", data:1},
    {id:"enemy", src:"sounds/enemy.mp3", data:2},
    {id:"target", src:"sounds/target.mp3", data:10},
    {id:"levelUp", src:"sounds/levelUp.mp3", data:2},
    {id:"hero", src:"images/hero.png"},
    {id:"background", src:"images/bg.png"},
    {id:"wall", src:"images/box_yellow.png"},
    {id:"enemy", src:"images/box_orange.png"},
    {id:"target", src:"images/box_green.png"},
    {id:"background_footpath", src:"images/background_footpath.png"},
    {id:"background_frontMountains", src:"images/background_frontMountains.png"},
    {id:"background_midMountains", src:"images/background_midMountains.png"},
    {id:"background_backMountains", src:"images/background_backMountains.png"}
    ]);
}

	


// ************ INITIALIZATION - Happens only once ****************

function init(){
  // document.getElementById("myCanvas").width = window.innerWidth;
  // document.getElementById("myCanvas").height = window.innerHeight;
  
  myStage = new createjs.Stage(document.getElementById("myCanvas"));
  stageWidth = myStage.canvas.width;
  stageHeight = myStage.canvas.height;

  background = new createjs.Bitmap("images/bg.png");
  // myStage.addChild(background);

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

  backgroundSound = createjs.Sound.play("backgroundSound");
  backgroundSound.volume = 0.3;
  backgroundSound.loop = -1;

  createjs.Ticker.addEventListener('tick', gameLoop);
  createjs.Ticker._setFPS(myFrameRate);
  //createjs.Ticker.setFPS(myFrameRate);
  
  loadLevel(0);
}


// ***************** THE MAIN LOOP ******************
function gameLoop(evt){
  // put code in here that will change every 'tick'
  runLevels();
  handleKeyInput();
  handleCollisions();

  myStage.update();
}


 

  /////////////////////////////
 //      DEFINE LEVELS     //
////////////////////////////

level[0] = 
  { preLevelDisplay : [
    {img: "images/level0.1.png", loc: {x: 0, y: 0}, toEnd: "onClick"},
    {img: "images/level0.2.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 1000},
    {img: "images/level0.3.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 1000},
    {img: "images/level0.4.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 1000}],
  
   
    // define an array of background images for paralax scrolling.  If you just need one image, just use one!  
   // 'scrollRate' is a multiplier of speed (e.g. 0.5 = half speed)
    backgroundImage : [{img: "images/background_footpath.png", scrollRate: 1},
                      {img: "images/background_frontMountains.png", scrollRate: 0.75},
                      {img: "images/background_midMountains.png", scrollRate: 0.66},
                      {img: "images/background_backMountains.png", scrollRate: 0.5}],
  
   
    objectsToSpawn : [{class: "target", img:"images/box_yellow.png", loc:{x:2000,y:1000}, collider: true, 
                       repeat: true, repeatSpacing: 400, repeatNumber: 20, repeatProbability: 0.5},
                     {class: "enemy", img:"images/box_orange.png", loc:{x:2300,y:1000}, collider: true, 
                       repeat: true, repeatSpacing: 500, repeatNumber: 20, repeatProbability: 0.5},
                     {class: "shrub", img:"images/box_green.png", loc:{x:1900,y:968}, collider: false, 
                       repeat: true, repeatSpacing: 400, repeatNumber: 20, repeatProbability: 0.5},
                     {class: "endGoal", img:"images/hero.png", loc:{x:5000,y:1000}, collider: true, 
                       repeat: false}],
   

    completionCheck : function() {
      if(level[0].complete){
        console.log("level 0 complete");
        createjs.Sound.play("levelUp");
        //enemySpeed += 2;
        level[0].active = false;
        loadLevel(1)

      }
    }
  }


level[1] = 
  { preLevelDisplay : [
    {img: "images/level2.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 2000},
    {img: "images/level0.2.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 1000},
    {img: "images/level0.3.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 1000},
    {img: "images/level0.4.png", loc: {x: 0, y: 0}, toEnd: "timer", duration: 1000}],
  
   
    // define an array of background images for paralax scrolling.  If you just need one image, just use one!  
   // 'scrollRate' is a multiplier of speed (e.g. 0.5 = half speed)
    backgroundImage : [{img: "images/background_footpath.png", scrollRate: 1},
                      {img: "images/background_frontMountains.png", scrollRate: 0.75},
                      {img: "images/background_midMountains.png", scrollRate: 0.66},
                      {img: "images/background_backMountains.png", scrollRate: 0.5}],
  
   
    objectsToSpawn : [{class: "target", img:"images/box_yellow.png", loc:{x:2000,y:1000}, collider: true, 
                       repeat: true, repeatSpacing: 400, repeatNumber: 20, repeatProbability: 0.8},
                     {class: "enemy", img:"images/box_orange.png", loc:{x:2300,y:1000}, collider: true, 
                       repeat: true, repeatSpacing: 500, repeatNumber: 20, repeatProbability: 0.8},
                     {class: "shrub", img:"images/box_green.png", loc:{x:1900,y:968}, collider: false, 
                       repeat: true, repeatSpacing: 400, repeatNumber: 20, repeatProbability: 0.8},
                     {class: "endGoal", img:"images/hero.png", loc:{x:5000,y:1000}, collider: true, 
                       repeat: false}],
   

    completionCheck : function() {
      if(level[1].complete){
        console.log("level 0 complete");
        createjs.Sound.play("levelUp");
        //enemySpeed += 2;
        level[1].active = false;
        loadLevel(2)

      }
    }
  }



level[2] = 
  { preLevelDisplay : [
    {img: "images/endScreen.png", loc: {x: 0, y: 0}, toEnd: "onClickRestart"}],

    completionCheck : function() {
      if(character.y <= 0){
        console.log("level 3 complete");
        level[2].active = false;
        createjs.Sound.play("levelUp");
        clearScreen();
        loadLevel(0)
      }
    }
  }



// Create the level from the level data grid in create
function loadLevel (m) {
  // remove children
  clearScreen();
  
  level[m].complete = false;
  
 // Display pre-level images (if any)
  if(typeof level[m].preLevelDisplay != "undefined") {
      
      function displayNext(i){
        if(i>=level[m].preLevelDisplay.length){return;}
        
        var preLevelImage = new createjs.Bitmap(level[m].preLevelDisplay[i].img)
        preLevelImage.x = level[m].preLevelDisplay[i].loc.x;
        preLevelImage.y = level[m].preLevelDisplay[i].loc.y;
        myStage.addChild(preLevelImage);
        myStage.update();
        
        if (level[m].preLevelDisplay[i].toEnd == "timer"){
          setTimeout(function(){
            myStage.removeChild(preLevelImage);
            if(i == level[m].preLevelDisplay.length-1){
              loadLevelComponents(m);
            }
            else { displayNext(i+1); }
            }, 
            level[m].preLevelDisplay[i].duration);
        }
        
        if (level[m].preLevelDisplay[i].toEnd == "onClick"){
          preLevelImage.on("click", function(){
            createjs.WebAudioPlugin.playEmptySound()
            myStage.removeChild(preLevelImage);
            if(i == level[m].preLevelDisplay.length-1){
              loadLevelComponents(m);
            }
            else { displayNext(i+1); }
            });
        }
        
        if (level[m].preLevelDisplay[i].toEnd == "onClickRestart"){
          console.log(preLevelImage);
          preLevelImage.on("click", function(){
            myStage.removeChild(preLevelImage);
            level[m].active = false;
            clearScreen();
            loadLevel(0);
          }) 
        }
      }
    
      let i = 0;
      displayNext(i);

  }
  else {
    loadLevelComponents(m);
  } 
}
  
  
 function loadLevelComponents(m){ 
   
  backgroundImages = []; 
   
  // Display background image
  background.image.src = level[m].backgroundImage;
   
   for (var i = level[m].backgroundImage.length-1; i >= 0; i--){
     var backgroundImage = new createjs.Bitmap(level[m].backgroundImage[i].img)
     backgroundImage.x = 0;
     backgroundImage.y = 0;
     backgroundImage.scrollRate = level[m].backgroundImage[i].scrollRate;
     backgroundImages.push(backgroundImage);
     
     var backgroundImageChaser = new createjs.Bitmap(level[m].backgroundImage[i].img)
     backgroundImageChaser.x = backgroundImageChaser.image.width - 20;
     backgroundImageChaser.y = 0;
     backgroundImageChaser.scrollRate = level[m].backgroundImage[i].scrollRate;
     backgroundImages.push(backgroundImageChaser);
   } 
  
   objectsToMove = [];
   
   for (var i = 0; i < level[m].objectsToSpawn.length; i++){
     // if (level[m].objectsToSpawn[i].class == "enemy"){
       //if repeating
       if (level[m].objectsToSpawn[i].repeat){
         for (var j = 0; j < level[m].objectsToSpawn[i].repeatNumber; j++){
           if(Math.random() < level[m].objectsToSpawn[i].repeatProbability){
              var object = new createjs.Bitmap(level[m].objectsToSpawn[i].img);
              object.class = level[m].objectsToSpawn[i].class;
              object.x = level[m].objectsToSpawn[i].loc.x + (j*level[m].objectsToSpawn[i].repeatSpacing);
              object.y = level[m].objectsToSpawn[i].loc.y;
              object.onStage = false;
              if(level[m].objectsToSpawn[i].collider){ collisionGnome.addCollider(object, 1.0);}
              objectsToMove.push(object);
           }
         }
       }
       // if not repeating just add the single iteration
       else {var object = new createjs.Bitmap(level[m].objectsToSpawn[i].img);
                object.class = level[m].objectsToSpawn[i].class;
                object.x = level[m].objectsToSpawn[i].loc.x;
                object.y = level[m].objectsToSpawn[i].loc.y;
                object.onStage = false;
                if(level[m].objectsToSpawn[i].collider){ collisionGnome.addCollider(object, 1.0);}
                objectsToMove.push(object);}

   }
   
   display(backgroundImages); 
  // display(walls);
  // display(targets);
  // display(enemies);
  display(character);
  display(scoreDisplay);
  
  myStage.setChildIndex( scoreDisplay, myStage.numChildren-1);
  
  level[m].active = true;
}


// ************* Various self-defined functions *************
 function runLevels(){
   for(var i=0;i<level.length;i++){
     if(level[i].active){
       currentLevel = i;
       level[i].completionCheck();
       
     }
   }
 }


function clearScreen(){
  myStage.removeAllChildren();
  //myStage.addChild(background, character, scoreDisplay);
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
  // if(keyMonkey["w"] || keyMonkey["up"]) 		{ character.y -= character.speed.up; handleWallCollisions("up");}
  // if(keyMonkey["s"] || keyMonkey["down"]) 	{ character.y += character.speed.down; handleWallCollisions("down");}
  if(keyMonkey["a"] || keyMonkey["left"]) 	{ moveBackground("left"); moveObjects("left"); 
                                             handleWallCollisions("left");}
  if(keyMonkey["d"] || keyMonkey["right"]) 	{ moveBackground("right"); moveObjects("right"); 
                                             handleWallCollisions("right");}
  if(keyMonkey["space"]) { jump(); }
}


function handleCollisions(){
  // check to see if there are any collisions with any of the targets
  for(var i=0;i<objectsToMove.length;i++){
    if(objectsToMove[i].collidesWith != undefined){
      if(character.collidesWith(objectsToMove[i])){
        // remove it from the array
        if(objectsToMove[i].class == "target"){
          myStage.removeChild(objectsToMove[i]);
          objectsToMove.splice(i, 1);
          score++;
          scoreDisplay.text = "SCORE: " + score;
          createjs.Sound.play("target");
        }
        if(objectsToMove[i].class == "enemy"){
          myStage.removeChild(objectsToMove[i]);
          objectsToMove.splice(i, 1);
          score--;
          scoreDisplay.text = "SCORE: " + score;
          createjs.Sound.play("enemy");
        }
        if(objectsToMove[i].class == "endGoal"){
          level[currentLevel].complete = true;
          // console.log("level complete");
          // createjs.Sound.play("levelUp");
          // //enemySpeed += 2;
          // level[currentLevel].active = false;
          // loadLevel(currentLevel+1);
        }
      }
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


function moveBackground(dir){
  if(dir == "right"){
    for(var i = 0; i<backgroundImages.length; i++){
      backgroundImages[i].x -= (speed * backgroundImages[i].scrollRate);
      if (backgroundImages[i].x <= -backgroundImages[i].image.width){
        backgroundImages[i].x = backgroundImages[i].image.width;
      }
    }
  }
   if(dir == "left"){
    for(var i = 0; i<backgroundImages.length; i++){
      backgroundImages[i].x += (speed * backgroundImages[i].scrollRate);
    }
  }
  // when arrow key pressed backgroundImage.x += speed * backgroundImage.scrollRate
  // if (backgroundImage.x <= -backgroundImage.image.width){ backgroundImage.x = backgroundImage.image.width;}
}

function moveObjects(dir){
  for(var i = objectsToMove.length-1; i >= 0; i--){
    if(dir == "right"){ objectsToMove[i].x -= speed;}
    if(dir == "left"){ objectsToMove[i].x += speed;}

      // if x is < 2000 and not added to stage
      if(objectsToMove[i].x < 2000 && objectsToMove[i].x > 0 && objectsToMove[i].onStage == false){
          objectsToMove[i].onStage = true;
          myStage.addChild(objectsToMove[i]);
          console.log("added child")
      }
    
    // if x is < -300 and is on the stage
      if(objectsToMove[i].x < -300 && objectsToMove[i].onStage == true){
          objectsToMove[i].onStage = false;
          myStage.removeChild(objectsToMove[i]);
          console.log("removed child")
      }
        
  }
}


function jump(){
  
}

  
