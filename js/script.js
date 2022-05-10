// ************************ GLOBAL VARIABLES *********************
  /* global createjs */
  /* global keyMonkey */
  /* global collisionGnome */


// to make it complete:
// sounds
// clickable objects - confirm choices are working

var myStage, stageWidth, stageHeight;
var myFrameRate = 24;
var character, background, scoreDisplay, theEnd, backgroundSound, endGoal;
var backgroundSound, sceneSound;
var speed = 10;
var enemySpeed = 2;
var currentLevel;

var score = 0;

var defaultStyle = {style: "bold 20px Helvetica", color: "red", alpha: 1, lineWidth: 50};
var textDisplay;
var currentText = "";

var walls = [];
var targets = [];
var enemies = [];
var level = [];
var backgroundImages = [];
var objectsToMove = [];

var activeScene = 0;
var scenes = [];
var sceneImages = [];
var textArray = [];



// ************************* PRELOAD ASSETS ***************************

function preload(){
  var queue = new createjs.LoadQueue(false);
  createjs.Sound.alternateExtensions = ["mp3"];
  queue.installPlugin(createjs.Sound);
  queue.on("complete", init);
  queue.loadManifest([
    {id:"scene1sound", src:"sounds/soundtrack.mp3", data:1},
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
    {id:"background_backMountains", src:"images/background_backMountains.png"},
    {id:"balloon01", src:"images/balloon01.png"},
    {id:"skull01", src:"images/skull01.png"},
    {id:"heroReddeSprite", src:"images/heroReddeSprite.png"},
    ]);
}

	


// ************ INITIALIZATION - Happens only once ****************

function init(){
  document.getElementById("myCanvas").width = window.innerWidth;
  document.getElementById("myCanvas").height = window.innerHeight;
  
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
  myStage.addChild(character);

  collisionGnome.addCollider(character, 1.0);
  collisionGnome.setStage(myStage);
  //collisionGnome.setDebug(true);

  // scoreDisplay = new createjs.Text("SCORE: " + score, "48px Courier");
  // scoreDisplay.x = stageWidth - 50;
  // scoreDisplay.y = stageHeight - 32;
  // scoreDisplay.textAlign = "right";
  // scoreDisplay.textBaseline = "middle";
  // myStage.addChild(scoreDisplay);

  // theEnd = new createjs.Text("THE END", "144px Courier");
  // theEnd.x = stageWidth / 2;
  // theEnd.y = stageHeight / 2;
  // theEnd.textAlign = "center";
  // theEnd.textBaseline = "middle";
  // theEnd.alpha = 0.;
  // myStage.addChild(theEnd);
  
  // textDisplay = makeText(currentText, defaultStyle, 330, 320); // start with an empty createjs.Text() object
  // textDisplay.msg = "";
  // textDisplay.counter = 0;
  // textDisplay.interval=1;
  // textDisplay.charIndex=0;
  // textDisplay.completed = false;
  // myStage.addChild(textDisplay);

  // backgroundSound = createjs.Sound.play("backgroundSound");
  // backgroundSound.volume = 0.3;
  // backgroundSound.loop = -1;

  createjs.Ticker.addEventListener('tick', gameLoop);
  createjs.Ticker._setFPS(myFrameRate);
  //createjs.Ticker.setFPS(myFrameRate);
  
  buildScene("scene1");
}


// ***************** THE MAIN LOOP ******************
function gameLoop(evt){
  // put code in here that will change every 'tick'
  //runLevels();
  //handleKeyInput();
  //handleCollisions();

  handleAnimations();
  handleSceneActions();
  writeText();
  //writeText(textDisplay);
  //myStage.setChildIndex(textDisplay, myStage.numChildren-1);
  myStage.update();
}


 

  /////////////////////////////
 //      DEFINE LEVELS     //
////////////////////////////

// set up scenery
// set up actors and their behaviors
// write "script" 

var scenes = [
  {id:"scene1",
   sound: {src: "scene1sound", volume: 1.0, loop: -1},
   
   images: [
     {id: "background", img:"images/bg.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "character", img:"images/hero.png", loc: {x:-200, y:250}, clickable: true, onClick:"smile"},
     {id: "villain", img:"images/skull01.png", loc: {x:2000, y:100}, clickable: true, onClick:"smile"}
     ],
   
   actions: [
     {type: "animation", id: "background", img:"images/bg.png", clickable: false, trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "character", img:"images/hero.png", loc: {x:200, y:250},
                  animation: {wait: 0,
                              startPosition:{x:-300, y:400, alpha:1, rotation:360, scaleX:0.75, scaleY:0.75},
                              endPosition:{x:200, y:300, alpha:1, rotation:0, scaleX:1, scaleY:1},
                              spriteAnimation:"wink",
                              duration: 3000},
                  clickable: true, onClick:"smile", trigger: "auto", duration: 5000, doNext: "nextAction"},
     {type: "animation", id: "villain", img:"images/skull01.png", loc: {x:500, y:100},
                  animation: {wait: 0,
                              startPosition:{x:2000, y:400, alpha:1, rotation:360, scale:0.75},
                              endPosition:{x:500, y:100, alpha:1, rotation:0, scale:1},
                              spriteAnimation:"wink",
                              duration: 3000},
                  clickable: true, onClick:"smile", trigger: "stageClick", duration: 5000, doNext: "nextAction"},
     {type: "text", speaker: "Hero", text: "You enter a room with two doors...", style: defaultStyle,
            loc: {x:330,y:320}, trigger: "stageClick", doNext: "nextAction", hideAfter:2},
     {type: "text", speaker: "Villain", text: "Wow two doors...", 
            loc: {x:630,y:120}, trigger: "stageClick", duration: 3000, doNext: "nextAction"},
     {type: "text", speaker: "Hero", text: "which should we pick...", 
            loc: {x:330,y:320}, trigger: "stageClick", doNext: "nextAction"},
     {type: "text", speaker: "Villain", text: "hmm...", 
            loc: {x:630,y:120}, trigger: "stageClick", doNext: "nextAction"},
     {type: "text", speaker: "Villain", text: "I don't know...", 
            loc: {x:630,y:120}, trigger: "stageClick", doNext: "nextAction"},
     {type: "animation", text: "", id: "character", 
                  animation: {wait: 0,
                              startPosition:{scale:1},
                              endPosition:{scale:1.5},
                              duration: 3000}, trigger: "stageClick", duration: 4000, doNext: "nextAction"},
     {type: "text", speaker: "Choice", text: "Take the door on the left", loc: {x:360,y:320}, 
            trigger: "click", doNext: "scene2a", hideAfter:2},
     {type: "text", speaker: "Choice", text: "Take the door on the right", loc: {x:360,y:350}, 
            trigger: "click", doNext: "scene2b"}]},
  
   {id:"scene2a", actions: []},
   {id:"scene2b", actions: []}
] 
   
  

// if an action has an onClick: defined it is like a choice
// onClick: nextAction advances to next action when that object is clicked
// onClick: targetScene builds a new scene
// e.g.  text "door #1" onClick: "scene2a" // text "door #2" onClick: "scene2b"


function buildScene(scene){
  // clear previous scene
  clearScene();
  
  // traverse all scenes and find the one you want
  for(var i = 0; i<scenes.length; i++){ if(scenes[i].id == scene){
    // play sound
    if(scenes[i].sound != undefined){
      sceneSound = createjs.Sound.play(scenes[i].sound.src);
      sceneSound.volume = scenes[i].sound.volume;
      sceneSound.loop = scenes[i].sound.looping;
    }
    
    // add images in order
    if(scenes[i].images != undefined){
      for (var j = 0; j<scenes[i].images.length; j++){
       var image = new createjs.Bitmap(scenes[i].images[j].img)
       image.x = scenes[i].images[j].loc.x;
       image.y = scenes[i].images[j].loc.y;
       image.id = scenes[i].images[j].id;
       image.animated = scenes[i].images[j].animated;
       image.animation = scenes[i].images[j].animation;
       image.clickable = scenes[i].images[j].clickable;
       image.onClick = scenes[i].images[j].onClick;
       sceneImages.push(image);
       myStage.addChild(sceneImages[sceneImages.length-1]);
      }
    }
      
    // make this the active scene
    scenes[i].active = true;
    console.log("The active scene is: " +i);
    
    // set the action counter to zero
    scenes[i].currentAction = 0;
    scenes[i].currentActionInitiated = false;
  }
    // set all other scenes inactive
    else { scenes[i].active = false;}
  }

  myStage.addChild(textDisplay);
}

function handleSceneActions(){
    for(var i = 0; i<scenes.length; i++){ 
      //if(scenes[i].active == true && !scenes[i].currentActionInitiated){
      if(i == activeScene && !scenes[i].currentActionInitiated){
        scenes[i].currentActionInitiated = true;   // something about this flag hinders secondary animations starting
        
        console.log("SCENE: " + scenes[i].id + " / ACTION: " + (scenes[i].currentAction));
        let thisAction = scenes[i].actions[scenes[i].currentAction];
        let object;
        //activeScene = i;
        
        // perform current action
        switch (thisAction.type){
          case "text":
            // display text
            //displayText(thisAction.speaker, thisAction.text);
            var textStyle;
            if(thisAction.style==undefined){ textStyle = defaultStyle;}
            else{textStyle = thisAction.style;}
            
            if(thisAction.hideAfter==undefined){thisAction.hideAfter=1;}
            
            let actionNumber = scenes[i].currentAction;
            
            textArray[actionNumber] = makeText(thisAction.text, textStyle, thisAction.loc.x, thisAction.loc.y);
            
            // create a rectangle shape the same size as the text, and assign it as the hitArea
			      // note that it is never added to the display list.
			      var hit = new createjs.Shape();
			      hit.graphics.beginFill("#000")
              .drawRect(0, 0, textArray[actionNumber].getMeasuredWidth(), textArray[actionNumber].getMeasuredHeight());
			      textArray[actionNumber].hitArea = hit;
            
            textArray[actionNumber].msg = thisAction.text;
            textArray[actionNumber].text = "";
            textArray[actionNumber].counter = 0;
            textArray[actionNumber].interval = 1;
            textArray[actionNumber].charIndex = 0;
            textArray[actionNumber].completed = false;
            textArray[actionNumber].hideAfter = thisAction.hideAfter;
            // console.log(actionNumber);
            // console.log(textArray[actionNumber]);
            // console.log(textArray);
            myStage.addChild(textArray[actionNumber]);
            
            object = textArray[actionNumber];
            
            break;
            
          case "image":
            for(var j = 0; j<sceneImages.length; j++){
              if(sceneImages[j].id==scenes[activeScene].actions[scenes[activeScene].currentAction].id){
                 object = sceneImages[j];}
            }
            break;
            
          case "animation":
            for(var j = 0; j<sceneImages.length; j++){
              if(sceneImages[j].id==scenes[activeScene].actions[scenes[activeScene].currentAction].id){
                 object = sceneImages[j];}
            }
            break;
        };
        
        // find object connected with this action (text in array, image in array, ) to allow clicking on object (not just stage)

        
        // set listener for nextAction trigger 
        switch (thisAction.trigger){
          case "click":
            console.log("Waiting for click.");
            if (thisAction.doNext=="nextAction"){
              object.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext); console.log("")}
              object.addEventListener('click', buildNext, {once : true});
            }
            break;
            
          case "timer":
            console.log("Next action in " + thisAction.duration + " milliseconds.");
            
            if (thisAction.doNext=="nextAction"){
              setTimeout(nextAction, thisAction.duration);
            }
            else {
              setTimeout(function(){buildScene(thisAction.doNext);}, thisAction.duration);
            }
            break;
            
          case "auto":
            nextAction();
            break;
            
          case "stageClick":
            console.log("Waiting for stage click.");
            if (thisAction.doNext=="nextAction"){
              //sceneImages[0].addEventListener('click', nextAction, {once : true}); // a little sketch - relying on bg image
              myStage.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext);}
              //sceneImages[0].addEventListener('click', buildNext, {once : true}); // a little sketch - relying on bg image
              myStage.addEventListener('click', buildNext, {once : true});
            }
            break;
            
          case "choice":
            // if choice add a stageListener to add next choices
            // and add an objectListener to each object
            if (thisAction.doNext=="nextAction"){
              object.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext);}
              object.addEventListener('click', buildNext, {once : true});
            }
        }
        
        //scenes[activeScene].currentActionInitiated = true;
      
    }
  }
}
  
  
function nextAction(){
  //console.log("nextAction called. scene: "+ activeScene+" currentAction: "+scenes[activeScene].currentAction);
  if(scenes[activeScene].currentAction <= scenes[activeScene].actions.length){
    // console.log("nextAction called. scene: "+ activeScene+" currentAction: "+scenes[activeScene].currentAction);
    scenes[activeScene].currentAction++;
  //}
  scenes[activeScene].currentActionInitiated = false;
  }
}
  

function displayText(speaker, text){
  console.log(speaker+": " + text);
  currentText = speaker+": " + text;
}
  

function handleAnimations(){
  if(scenes[activeScene].actions[scenes[activeScene].currentAction] != undefined){
  if(scenes[activeScene].actions[scenes[activeScene].currentAction].animation != undefined){
    //console.log("animation defined");
    if(scenes[activeScene].currentActionInitiated == false){
      // console.log("currentActionInitiated = false");
      //scenes[activeScene].currentActionInitiated = true;
      let animation = scenes[activeScene].actions[scenes[activeScene].currentAction].animation;
      // var objectToAnimate;
      for(var i = 0; i<sceneImages.length; i++){
        // console.log(sceneImages[i].id);
        // console.log(scenes[activeScene].actions[scenes[activeScene].currentAction].id); // this part not getting updated?
        if(sceneImages[i].id==scenes[activeScene].actions[scenes[activeScene].currentAction].id){
          // console.log("inner sanctum");
          var objectToAnimate = sceneImages[i];

          //scenes[activeScene].currentActionInitiated = true;
          
          createjs.Tween.get(objectToAnimate)
                    .wait(animation.wait)
                    .to(animation.startPosition)
                    .to(animation.endPosition, animation.duration, createjs.Ease.getPowInOut(4))
                    //.call(nextAction);
        }
      }
    }
  }  
 }
}

// Make each text a new Text instance pushed into texts[] array.
// Somehow remove last text.
  
function writeText(){
  for(var i = 0; i<textArray.length;i++){
    // textArray is populated based on action index (action 4 goes in textArray[4])
    // use text.hideAfter to determine when to remove it
  if(textArray[i]!=undefined){
    var thisText = textArray[i];
    
    // if text is completed see if it is time to remove text    
    if((thisText.completed == true) && (scenes[activeScene].currentAction >= (i+thisText.hideAfter))){
      myStage.removeChild(thisText);
      //textArray.splice(i,1);
    }

   // if text isn't completed keep updating text
    if(thisText.charIndex<thisText.msg.length){
     thisText.completed = false;
     thisText.counter++;
     if(thisText.counter%thisText.interval===0){
       //console.log("hi");
       thisText.text += thisText.msg.charAt(thisText.charIndex);
       thisText.charIndex++;
     }    
   }else if (thisText.charIndex == thisText.msg.length){
       thisText.completed = true;
     }
   }
  }
 }


function makeText(txt,style,xPos,yPos) {
  // returns a createjs.Text object... pass obj like this: {txt: , style: , color: , xPos: , yPos:}
  let t = new createjs.Text(txt, style.style, style.color);
  t.x = xPos;
  t.y = yPos;
  return t;
}


function clearScene(){
  // stop sound
  sceneSound = null;
  
  // remove images (children) from stage
  myStage.removeAllChildren();
  sceneImages = [];
  
}