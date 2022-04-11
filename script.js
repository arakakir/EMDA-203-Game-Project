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


// if(some condition is true){
//   //do the stuff in here
// }
// else{
//   // do this stuff instead
// }


// if(some condition is true){
//   //do the stuff in here
// }
// else if (some other condition){
//   // do this stuff
// }
// else{
//   // do this stuff instead
// }


var names = ["Mickie", "Miles", "Myland"];
console.log(names);

names[1] = "Super Miles";
names[3] = "Melissa";

console.log("The person on stage with me is " + names[1]);












var myStage;
var things = [];

function init(){
	myStage = new createjs.Stage(document.getElementById("myCanvas"));
	createjs.Ticker._setFPS(60);
	createjs.Ticker.addEventListener('tick', gameLoop);
	initGame();	
}

function initGame(){
// display 8 heros in a line
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
      //hero.y = i * 10;
      thing.scaleX = thing.scaleY = 1;
      thing.characterType = "hero";
      myStage.addChild(thing);
      things.push(thing);
    }
    else{
      var thing = new createjs.Bitmap("/images/box_128.png");
      thing.x = i * 120;
      //hero.y = i * 10;
      thing.scaleX = thing.scaleY = 1;
      thing.characterType = "box";
      myStage.addChild(thing);
      things.push(thing);
      
    }
  }
}

function moveThings(){
  // 
}