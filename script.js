/* global createjs */


var integer = 5; // numbers
var float = 1.032323; // floating point number w/ decimal)
var boolean = true; // false or true, 0 or 1
var strings = "Yep they do!";
var array = [1, 2, 4, 6, 3]; // list of indexed values
var mixedArray = ["hello", 5, float];
// var arrayOfEnemies = [enemy1, enemy2, enemy3];

var object = {};
var myCharacter = {};
myCharacter.name = "Super Miles";
myCharacter.age = 10;
myCharacter.height = 103;
myCharacter.hitPoints = 25;
myCharacter.gymEligible = true;
myCharacter.favoriteColors = ["yellow", "green", "puce", "other"];

// console.log(myCharacter);


//	Global Variables
var myStage;
var heroArray = [];
//	1. Add a new variable named bg

function init(){
	myStage = new createjs.Stage(document.getElementById("myCanvas"));
	createjs.Ticker._setFPS(60);
	createjs.Ticker.addEventListener('tick', gameLoop);
	initGame();	
}

function makeOneHero(){
  var hero = new createjs.Bitmap("images/hero.png");
	myStage.addChild(hero);
  
//	5. Adjust the hero's .x and .y position on the stage...
  var randomX = Math.random() * (1000 - 128);
  console.log(randomX);
  
  var randomY = Math.random() * (800 - 128);
  console.log(randomY);
  
  var randomRotation = Math.random() * (360);
  console.log(randomRotation);
  
	 hero.x = randomX;  // half of 1000
	 hero.y = randomY;  // half of 800
   hero.rotation = randomRotation;
   hero.scaleX = hero.scaleY = Math.random();
  
  heroArray.push(hero);
}

function randomNumberInRange(min, max){
  // let's think through making random between 5 to 10
  
  // make number between o and 1
  var myNumber = Math.random() * (max - min + 1);
  myNumber = myNumber + min
  myNumber = Math.floor(myNumber);
  
  return myNumber;
  //console.log(myNumber);
}

function initGame(){

  var num = randomNumberInRange(10,500);
  console.log(num);
  
  for (let i = 0; i < num; i++){
    console.log("hmm???");
    makeOneHero();
  }
	// makeOneHero();
	// makeOneHero();
	// makeOneHero();
  
  // make a random number of heros between 5 and 10
}

function gameLoop(){
  for(let i=0; i<heroArray.length; i++){
    heroArray[i].rotation++;
  }
  
	myStage.update();
}