/* global createjs */


// GAME SETTINGS
var gameType = "top-down";  // other option: "side-scrolling"
var gameName = "My Amazing Game"  // replace with your game's name

//	Global Variables
var myStage;
var things = [];

function init(){
	myStage = new createjs.Stage(document.getElementById("myCanvas"));
	createjs.Ticker._setFPS(60);
	createjs.Ticker.addEventListener('tick', gameLoop);
	initGame();	
}

function initGame(){

  makeThings(10);
  console.log(things);

  createAssets();
  
}

function gameLoop(){
  moveThings();
	myStage.update();
}

function makeThings(num){
  for(var i = 0; i < num; i++){

    if(i % 2 == 0){
      var thing = new createjs.Bitmap("/images/hero.png");
      thing.x = i * 120;
      thing.regX = thing.regY = 64;
      thing.y = i * 10;
      thing.scaleX = thing.scaleY = 1;
      thing.characterType = "hero";
      myStage.addChild(thing);
      things.push(thing);
    }
    else{
      var thing = new createjs.Bitmap("/images/box_128.png");
      thing.x = i * 120;
      thing.regX = thing.regY = 64;
      thing.y = i * 10;
      thing.scaleX = thing.scaleY = 1;
      thing.characterType = "box";
      myStage.addChild(thing);
      things.push(thing);
      
    }
  }
}

function moveThings(){
  // move each element in the array based on its characterType
  for(var i = 0; i < things.length; i++){
    if(things[i].characterType == "hero"){
      things[i].rotation += 1;
    }
    else if (things[i].characterType == "box"){
            things[i].rotation -= 3;
    }
  }
}


//	object classes (target, bomb, enemy, etc.)
// 		number
// 		spawn rate
// 			instantaneous
// 			one per x seconds
// 			speeding up / slowing down
// 	starting location options
// 		random
// 		on/off screen
// 	object movement
// 		none
// 		random
// 		constrain x, constrain y

// 	hero.movementStyle = “constrainX"

var defaultObject = {
    name: "hero", 
    imgSrc: "images/hero.png",
    quantity: 1,
    spawnRate: "instantaneous",
    transform: {
      x: 100,
      y: 100,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      regX: 0,
      regY: 0
    },
    startingLocation: {x: 100, y: 100},
    rotation: 0,
    movement: "static"
    
};

function createAssets(num, type){
  
}