/* global createjs */

//	Global Variables
var myStage;
var hero;
//	1. Add a new variable named bg

function init(){
	myStage = new createjs.Stage(document.getElementById("myCanvas"));
	createjs.Ticker._setFPS(60);
	createjs.Ticker.addEventListener('tick', gameLoop);
	initGame();	
}

function initGame(){
//	2. Assign the bg variable a new createjs.Bitmap() and...
//	3. Add the bg to the Stage using the .addChild() method
	hero = new createjs.Bitmap("images/hero.png");
	myStage.addChild(hero);
  
//	4. Set the hero's registration point to be in the center of the image (vs upper left)
	// hero.regX = 64;
	// hero.regY = 64;
  
//	5. Adjust the hero's .x and .y position on the stage...
//	hero.x = 512;
}

function gameLoop(){
	myStage.update();
}