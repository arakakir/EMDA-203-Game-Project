/* global createjs */
//	Global Variables

// for loops

// for(var i = 0; i < 5; i++){
//   document.write("The number is "+ i);
//   document.write("<br>");
// }

// for(var i = 0; i < 100; i++){
//   document.write("All work and no play...");
//   document.write("<br>");
// }

// for(var i = 0; i < 100; i++){
//   document.write(i * 64);
//   document.write("<br>");
// }
















var myStage;
var hero;

function init(){
	myStage = new createjs.Stage(document.getElementById("myCanvas"));
	createjs.Ticker._setFPS(60);
	createjs.Ticker.addEventListener('tick', gameLoop);
	initGame();	
}

function initGame(){
// display 8 heros in a line
  for(var i = 0; i < 8; i++){
    // display a hero
    hero = new createjs.bitmap("")
  }
}

function gameLoop(){
	myStage.update();
}