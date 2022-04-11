/* global createjs */

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