// ************************ GLOBAL VARIABLES *********************
  /* global createjs, keyMonkey, collisionGnome */
  /* global defaultStyle, whiteTextStyle, blackTextStyle */
  /* global collisionGnome */


// to make it complete:
// sounds - use prelevel screen loads to initiate sound?
// make doNext be able to be a scene, nextAction, or a specific numbered action of current scene
// then you can have exit animations that then auto trigger next scene.


var myStage, stageWidth, stageHeight;
var myFrameRate = 24;
var character, background, scoreDisplay, theEnd, backgroundSound, endGoal;
var backgroundSound, sceneSound;
var speed = 10;
var enemySpeed = 2;
var currentLevel;

var score = 0;

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
var sceneSounds = [];



// ************************* PRELOAD ASSETS ***************************

function preload(){
  var queue = new createjs.LoadQueue(false);
  createjs.Sound.alternateExtensions = ["mp3"];
  queue.installPlugin(createjs.Sound);
  queue.on("complete", init);
  queue.loadManifest([
    {id:"JackAmbience", src:"sounds/JackAmbience.mp3", data:1},
    {id:"MalakaiAmbience", src:"sounds/MalakaiAmbience.mp3", data:2},
    {id:"LobbyAmbience", src:"sounds/LobbyAmbience.mp3", data:3},
    {id:"MalakaiBase", src:"images/MalakaiSpriteBase.png"},
    {id:"MalakaiRoom", src:"images/MalakaiRoom.png"},
    {id:"MalakaiDread", src:"images/MalakaiSpriteDread.png"},
    {id:"MalakaiFlustered", src:"images/MalakaiSpriteFlustered.png"},
    {id:"MalakaiLaughing", src:"images/MalakaiSpriteLaughing.png"},
    {id:"LobbyRoom", src:"images/LobbyRoom.png"},
    {id:"DaveyTextBox", src:"images/DaveyTextBox.png"},
    {id:"BellhopTextBox", src:"images/BellhopTextBox.png"},
    {id:"JackRoom", src:"images/JackRoom.png"},
    {id:"JackFrown", src:"images/JackSpriteFrown.png"},
    {id:"JackHorny", src:"images/JackSpriteHorny.png"},
    {id:"JackSmile", src:"images/JackSpriteSmile.png"},
    {id:"JackTextBox", src:"images/JackTextBox.png"},
    {id:"JackRoom", src:"images/JackRoom.png"}
    ]);
}

	


// ************ INITIALIZATION - Happens only once ****************

function init(){
  // document.getElementById("myCanvas").width = window.innerWidth;
  // document.getElementById("myCanvas").height = window.innerHeight;
  
  myStage = new createjs.Stage(document.getElementById("myCanvas"));
  stageWidth = myStage.canvas.width;
  stageHeight = myStage.canvas.height;

  // background = new createjs.Bitmap("images/bg.png");
  // myStage.addChild(background);

  // character = new createjs.Bitmap("images/hero.png");
  // character.regX = character.regY = 64;
  // character.x = stageWidth / 2;
  // character.y = stageHeight - 64;
  // character.startPosition = {x: 0, y: 0};
  // character.scaleX = character.scaleY = 0.4;
  // myStage.addChild(character);

  // collisionGnome.addCollider(character, 1.0);
  // collisionGnome.setStage(myStage);
  //collisionGnome.setDebug(true);

  backgroundSound = createjs.Sound.play("scene1sound");
  backgroundSound.volume = 0.3;
  backgroundSound.loop = -1;
  
  buildScene("Malakai's Room Part 1");
  //buildScene("MalakaiResponse1");

  createjs.Ticker.addEventListener('tick', gameLoop);
  createjs.Ticker._setFPS(myFrameRate);
  //createjs.Ticker.setFPS(myFrameRate);
  

}

//////////////////////////////////////////////////////
// ***************** THE MAIN LOOP ******************
function gameLoop(evt){
  
  handleAnimations();
  handleSceneActions();
  writeText();
  myStage.update();
  
}
///////////////////////////////////////////////////////
   
  
// display choice - 

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
    // if(scenes[i].sound != undefined){
    //   sceneSound = createjs.Sound.play(scenes[i].sound.src);
    //   sceneSound.volume = scenes[i].sound.volume;
    //   sceneSound.loop = scenes[i].sound.looping;
    //   //sceneSound.gainNode.context.
    // }
    
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
    activeScene = i;
    
    // set the action counter to zero
    scenes[i].currentAction = 0;
    scenes[i].currentActionInitiated = false;
    
    console.log("Scene " + i + " currentAction = " +scenes[i].currentAction);
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
            
            // console.log(scenes[i].currentAction);
            
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
                 object = sceneImages[j];
                // if img is provided, swap the image for this object
                 if(thisAction.img != undefined){
                   sceneImages[j].image.src = thisAction.img;
                   //sceneImage associated with thisAction
                 }
              }
            }
            break;
            
          case "sound":
            var thisSound = createjs.Sound.play(thisAction.src);
            thisSound.volume = thisAction.volume;
            thisSound.loop = thisAction.loop;
            sceneSounds.push(thisSound);// add sound to array of sceneSounds
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
            else if (thisAction.doNext=="goToAction"){
              //if specific action specified
              //thisAction.nextAction
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
              myStage.removeAllEventListeners();
              myStage.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext);}
              myStage.removeAllEventListeners();
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
            break;
            
          case "lastchoice":
            // if lastchoice remove all stageListeners
            // and add an objectListener to this object
            if (thisAction.doNext=="nextAction"){
              myStage.removeAllEventListeners();
              object.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext);}
              myStage.removeAllEventListeners();
              object.addEventListener('click', buildNext, {once : true});
            }
            break;
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
  t.lineHeight = style.lineHeight;
  t.x = xPos;
  t.y = yPos;
  return t;
}


function clearScene(){
  // stop sound
  //sceneSound = null;
  sceneSounds = [];
  
  // clear textArray
  textArray = [];
  
  // remove images (children) from stage
  myStage.removeAllChildren();
  sceneImages = [];
  
}