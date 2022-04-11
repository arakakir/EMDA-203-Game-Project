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
  
}

function gameLoop(){
	myStage.update();
}

function makeThings(num){
  for(var i = 0; i < num; i++){

    if(i % 2 == 0){
      var hero = new createjs.Bitmap("/images/hero.png");
      hero.x = i * 120;
      //hero.y = i * 10;
      hero.scaleX = hero.scaleY = 1;
      myStage.addChild(hero);
      
    }
    else{
      var box = new createjs.Bitmap("/images/box_128.png");
      box.x = i * 120;
      //hero.y = i * 10;
      box.scaleX = box.scaleY = 1;
      myStage.addChild(box);
    }
  }
}