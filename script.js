/* global createjs */
//	Global Variables




















var myStage;


function init(){
	myStage = new createjs.Stage(document.getElementById("myCanvas"));
	createjs.Ticker._setFPS(60);
	createjs.Ticker.addEventListener('tick', gameLoop);
	initGame();	
}

function initGame(){

}

function gameLoop(){
	myStage.update();
}