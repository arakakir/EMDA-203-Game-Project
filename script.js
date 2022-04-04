/* global createjs */


var integer = 5; // numbers
var float = 1.032323; // floating point number w/ decimal)
var boolean = true; // false or true, 0 or 1
var strings = "Yep they do!";
var array = [1, 2, 4, 6, 3]; // list of indexed values
var mixedArray = ["hello", 5, float];
var arrayOfEnemies = [enemy1, enemy2, enemy3];

var object = {};
var myCharacter = {};
myCharacter.age = 10;
myCharacter.height = 103;
myCharacter.hitPoints = 25;


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