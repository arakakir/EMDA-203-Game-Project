// ************************ GLOBAL VARIABLES *********************
  /* global createjs */
  /* global keyMonkey */
  /* global collisionGnome */


// to make it complete:
// sounds
// text objects created for each line of text
// clickable objects

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
    {id:"backgroundSound", src:"sounds/soundtrack.mp3", data:1},
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
  
  textDisplay = makeText(currentText, defaultStyle, 330, 320); // start with an empty createjs.Text() object
  textDisplay.msg = "";
  textDisplay.counter = 0;
  textDisplay.interval=1;
  textDisplay.charIndex=0;
  textDisplay.completed = false;
  myStage.addChild(textDisplay);

  backgroundSound = createjs.Sound.play("backgroundSound");
  backgroundSound.volume = 0.3;
  backgroundSound.loop = -1;

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
  writeText(textDisplay);
  myStage.setChildIndex(textDisplay, myStage.numChildren-1);
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
                  clickable: true, onClick:"smile", trigger: "click", duration: 5000, doNext: "nextAction"},
     {type: "text", speaker: "Hero", text: "You enter a room with two doors...", style: defaultStyle,
            loc: {x:330,y:320}, trigger: "click", doNext: "nextAction"},
     {type: "text", speaker: "Villain", text: "Wow two doors...", 
            loc: {x:630,y:120}, trigger: "click", duration: 3000, doNext: "nextAction"},
     {type: "text", speaker: "Hero", text: "which should we pick...", 
            loc: {x:330,y:320}, trigger: "click", doNext: "nextAction"},
     {type: "text", speaker: "Villain", text: "hmm...", 
            loc: {x:630,y:120}, trigger: "click", doNext: "nextAction"},
     {type: "text", speaker: "Villain", text: "I don't know...", 
            loc: {x:630,y:120}, trigger: "click", doNext: "nextAction"},
     {type: "animation", text: "", id: "character", 
                  animation: {wait: 0,
                              startPosition:{scale:1},
                              endPosition:{scale:1.5},
                              duration: 3000}, trigger: "click", duration: 4000, doNext: "nextAction"},
     {type: "text", speaker: "Choice", text: "Take the door on the left", loc: {x:330,y:320}, 
            trigger: "click", doNext: "scene2a"},
     {type: "text", speaker: "Choice", text: "Take the door on the right", loc: {x:330,y:320}, 
            trigger: "click", doNext: "scene2a"}]}                   
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
    sceneSound = createjs.Sound.play(scenes[i].sound.src);
    sceneSound.volume = scenes[i].sound.volume;
    sceneSound.loop = scenes[i].sound.looping;
    
    // add images in order
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
      
    // make this the active scene
    scenes[i].active = true;
    
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
        //activeScene = i;
        
        // perform current action
        switch (thisAction.type){
          case "text":
            // display text
            //displayText(thisAction.speaker, thisAction.text);
            var textStyle;
            if(thisAction.style==undefined){ textStyle = defaultStyle;}
            else{textStyle = thisAction.style;}
            
            textArray.push(makeText(thisAction.text, textStyle, thisAction.loc.x, thisAction.loc.y));
            textArray[textArray.length-1].msg = "";
            textArray[textArray.length-1].counter = 0;
            textArray[textArray.length-1].interval=1;
            textArray[textArray.length-1].charIndex=0;
            textArray[textArray.length-1].completed = false;
            //myStage.addChild(textArray[textArray.length-1]);
            
            
            break;
            
          case "image":
             // var image = new createjs.Bitmap(thisAction.img)
             // image.x = thisAction.loc.x;
             // image.y = thisAction.loc.y;
             // image.id = thisAction.id;
             // image.animated = thisAction.animated;
             // image.animation = thisAction.animation;
             // image.clickable = thisAction.clickable;
             // image.onClick = thisAction.onClick;
             // sceneImages.push(image);
             // myStage.addChild(sceneImages[sceneImages.length-1]);
            break;
            
          case "animation":
            break;
            
          case "choice":
            break
        };
        
        // find object connected with this action (text in array, image in array, ) to allow clicking on object (not just stage)

        
        // set listener for nextAction trigger 
        switch (thisAction.trigger){
          case "click":
            console.log("Waiting for click.");
            if (thisAction.doNext=="nextAction"){
              myStage.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext);}
              myStage.addEventListener('click', buildNext, {once : true});
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
              myStage.addEventListener('click', nextAction, {once : true});
            }
            else {
              function buildNext(){buildScene(thisAction.doNext);}
              myStage.addEventListener('click', buildNext, {once : true});
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

// Make each text a new Text instance pushed into texts[] array.
// Somehow remove last text.
  
function writeText(){
  if(scenes[activeScene].actions[scenes[activeScene].currentAction].type == "text"){
    
    var thisAction = scenes[activeScene].actions[scenes[activeScene].currentAction];

    // iterate textArray with id's
    // textArray is populated based on action index (action 4 goes in textArray[4])
    
    // if text is completed wait for next action to start new text
    if((textDisplay.completed == true) && (textDisplay.msg != thisAction.text)){
      textDisplay.msg = thisAction.text;
      textDisplay.text = "";
      textDisplay.charIndex = 0;
      if(thisAction.loc != undefined){
        textDisplay.x = thisAction.loc.x;
        textDisplay.y = thisAction.loc.y;
      }
    }

  
    // if text isn't completed keep updating text
   if(textDisplay.charIndex<textDisplay.msg.length){
     textDisplay.completed = false;
     textDisplay.counter++;
     if(textDisplay.counter%textDisplay.interval===0){
       //console.log("hi");
       textDisplay.text += textDisplay.msg.charAt(textDisplay.charIndex);
       textDisplay.charIndex++;
     }    
   }else if (textDisplay.charIndex == textDisplay.msg.length){
       textDisplay.completed = true;
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

// var scenes = [
//   {id:"scene1",
//    sound: "scene1sound",
//    text: [{speaker: "James", text: "You enter a room with two doors..."},
//          {speaker: "Jennifer", text: "Wow two doors..."}
//          ], 
//    textScrolling: true,
//    choices: [
//      {text:"Take the door on the left", next:"scene2a"},
//      {text:"Take the door on the right", next:"scene2b"},
//      {image:"pushButton1", loc: {x:0, y:0}, next:"scene2c"}], 
//    images: [
//      {img:"images/scene1_background.png", animated: false, clickable: false},
//      {img:"images/scene1_character.png", animated: true, clickable: true, 
//       animation: {wait: 0,
//                   startPosition:{x:-300, y:400, alpha:1, rotation:0, scale:0.75},
//                   endPosition:{x:200, y:300, alpha:1, rotation:0, scale:1},
//                   duration: 3000},
//      onClick:"smile"}
//      ]
//   }, 
  
//   {id:"scene2a",
//    sound: "scene2sound",
//    text: "You chose the left door. Now what?", 
//    choices: [
//      {text:"Give up.", next:"scene3a"},
//      {text:"Wind", next:"scene3b"}], 
//    images: [
//      {img:"images/scene2a_background.png", animated: false},
//      {img:"images/scene2a_character.png", animated: true, 
//       animation: {wait: 0,
//                   startPosition:{x:-300, y:400, alpha:1, rotation:0, scale:0.75},
//                   endPosition:{x:200, y:300, alpha:1, rotation:0, scale:1},
//                   duration: 3000}}
//      ]
//   }, 
  
//   {id:"scene2b",
//    sound: "scene2sound",
//    text: "You chose the right door. Now what?", 
//    choices: [
//      {text:"Ascend to the throne.", next:"scene3c"},
//      {text:"Give up.", next:"scene3a"}], 
//    images: [
//      {img:"images/scene2b_background.png", animated: false},
//      {img:"images/scene2b_character.png", animated: true, 
//       animation: {wait: 0,
//                   startPosition:{x:-300, y:400, alpha:1, rotation:0, scale:0.75},
//                   endPosition:{x:200, y:300, alpha:1, rotation:0, scale:1},
//                   duration: 3000}}
//      ]
//   }
// ]

function clearScene(){
  // stop sound
  sceneSound = null;
  
  // remove images (children) from stage
  myStage.removeAllChildren();
  sceneImages = [];
  
}


// // Create the level from the level data grid in create
// function loadLevel (m) {
//   // remove children
//   clearScreen();
  
//   level[m].complete = false;
  
//  // Display pre-level images (if any)
//   if(typeof level[m].preLevelDisplay != "undefined") {
      
//       function displayNext(i){
//         if(i>=level[m].preLevelDisplay.length){return;}
        
//         var preLevelImage = new createjs.Bitmap(level[m].preLevelDisplay[i].img)
//         preLevelImage.x = level[m].preLevelDisplay[i].loc.x;
//         preLevelImage.y = level[m].preLevelDisplay[i].loc.y;
//         myStage.addChild(preLevelImage);
//         myStage.update();
        
//         if (level[m].preLevelDisplay[i].toEnd == "timer"){
//           setTimeout(function(){
//             myStage.removeChild(preLevelImage);
//             if(i == level[m].preLevelDisplay.length-1){
//               loadLevelComponents(m);
//             }
//             else { displayNext(i+1); }
//             }, 
//             level[m].preLevelDisplay[i].duration);
//         }
        
//         if (level[m].preLevelDisplay[i].toEnd == "onClick"){
//           preLevelImage.on("click", function(){
//             createjs.WebAudioPlugin.playEmptySound()
//             myStage.removeChild(preLevelImage);
//             if(i == level[m].preLevelDisplay.length-1){
//               loadLevelComponents(m);
//             }
//             else { displayNext(i+1); }
//             });
//         }
        
//         if (level[m].preLevelDisplay[i].toEnd == "onClickRestart"){
//           console.log(preLevelImage);
//           preLevelImage.on("click", function(){
//             myStage.removeChild(preLevelImage);
//             level[m].active = false;
//             clearScreen();
//             loadLevel(0);
//           }) 
//         }
//       }
    
//       let i = 0;
//       displayNext(i);

//   }
//   else {
//     loadLevelComponents(m);
//   } 
// }
  
  
// function loadLevelComponents(m){ 
   
//   backgroundImages = []; 
   
//   // Display background image
//   background.image.src = level[m].backgroundImage;
   
//    for (var i = level[m].backgroundImage.length-1; i >= 0; i--){
//      var backgroundImage = new createjs.Bitmap(level[m].backgroundImage[i].img)
//      backgroundImage.x = 0;
//      backgroundImage.y = 0;
//      backgroundImage.scrollRate = level[m].backgroundImage[i].scrollRate;
//      backgroundImages.push(backgroundImage);
     
//      var backgroundImageChaser = new createjs.Bitmap(level[m].backgroundImage[i].img)
//      backgroundImageChaser.x = backgroundImageChaser.image.width - 20;
//      backgroundImageChaser.y = 0;
//      backgroundImageChaser.scrollRate = level[m].backgroundImage[i].scrollRate;
//      backgroundImages.push(backgroundImageChaser);
//    } 
  
//    objectsToMove = [];
   
//    for (var i = 0; i < level[m].objectsToSpawn.length; i++){
//      // if (level[m].objectsToSpawn[i].class == "enemy"){
//        //if repeating
//        if (level[m].objectsToSpawn[i].repeat){
//          for (var j = 0; j < level[m].objectsToSpawn[i].repeatNumber; j++){
//            if(Math.random() < level[m].objectsToSpawn[i].repeatProbability){
//               var object = new createjs.Bitmap(level[m].objectsToSpawn[i].img);
//               object.class = level[m].objectsToSpawn[i].class;
//               object.x = level[m].objectsToSpawn[i].loc.x + (j*level[m].objectsToSpawn[i].repeatSpacing);
//               object.y = level[m].objectsToSpawn[i].loc.y;
//               object.onStage = false;
//               if(level[m].objectsToSpawn[i].collider){ collisionGnome.addCollider(object, 1.0);}
//               objectsToMove.push(object);
//            }
//          }
//        }
//        // if not repeating just add the single iteration
//        else {var object = new createjs.Bitmap(level[m].objectsToSpawn[i].img);
//                 object.class = level[m].objectsToSpawn[i].class;
//                 object.x = level[m].objectsToSpawn[i].loc.x;
//                 object.y = level[m].objectsToSpawn[i].loc.y;
//                 object.onStage = false;
//                 if(level[m].objectsToSpawn[i].collider){ collisionGnome.addCollider(object, 1.0);}
//                 objectsToMove.push(object);}

//    }
   
//   display(backgroundImages); 
//   display(character);
//   display(scoreDisplay);
  
//   myStage.setChildIndex( scoreDisplay, myStage.numChildren-1);
  
//   level[m].active = true;
// }


// ************* Various self-defined functions *************
//  function runLevels(){
//    for(var i=0;i<level.length;i++){
//      if(level[i].active){
//        currentLevel = i;
//        level[i].completionCheck();
       
//      }
//    }
//  }


// function clearScreen(){
//   myStage.removeAllChildren();
//   objectsToMove = [];
//   //myStage.addChild(background, character, scoreDisplay);
//   myStage.update();
// }


// function display(object){
//   if(object.constructor === Array){
//     for(var i=0; i<object.length; i++){
//       myStage.addChild(object[i]);
//     }
//   }
//   else{
//     myStage.addChild(object);
//   }
// }


// function handleKeyInput(){
//   if(keyMonkey["w"] || keyMonkey["up"]) 		{ character.y -= character.speed.up; handleWallCollisions("up");}
//   if(keyMonkey["s"] || keyMonkey["down"]) 	{ character.y += character.speed.down; handleWallCollisions("down");}
//   if(keyMonkey["a"] || keyMonkey["left"]) 	{ moveBackground("left"); moveObjects("left"); 
//                                              handleWallCollisions("left");}
//   if(keyMonkey["d"] || keyMonkey["right"]) 	{ moveBackground("right"); moveObjects("right"); 
//                                              handleWallCollisions("right");}
//   // if (keyMonkey['up'] || keyMonkey['w'] || keyMonkey['space_bar']) {	//if any of our 'jump' keys are held down
//   // //NOTE: 'if(!hero.jumping)' is the same as 'if(hero.jumping != true)' which is the same as 'if(hero.jumping == false)'
//   // //so... AND he's not already jumping
//   // if (!character.jumping) {	
//   // character.jumping = true;
//   // character.grounded = false;
//   // //character.dy = -character.max_dy ;
//   // }
//   // }
// }


// function handleCollisions(){
//   // check to see if there are any collisions with any of the targets
//   for(var i=0;i<objectsToMove.length;i++){
//     if(objectsToMove[i].collidesWith != undefined){
//       if(character.collidesWith(objectsToMove[i])){
//         // remove it from the array
//         if(objectsToMove[i].class == "target"){
//           myStage.removeChild(objectsToMove[i]);
//           objectsToMove.splice(i, 1);
//           score++;
//           scoreDisplay.text = "SCORE: " + score;
//           createjs.Sound.play("target");
//         }
//         if(objectsToMove[i].class == "enemy"){
//           myStage.removeChild(objectsToMove[i]);
//           objectsToMove.splice(i, 1);
//           score--;
//           scoreDisplay.text = "SCORE: " + score;
//           createjs.Sound.play("enemy");
//         }
//         if(objectsToMove[i].class == "endGoal"){
//           level[currentLevel].complete = true;

//         }
//       }
//     }
//   }
// }
  
  
// // check to see if there are any collisions with any of the walls
// function handleWallCollisions(direction){
//   character.speed = {"up": speed,"down": speed,"left":speed,"right":speed};
  
//   for(var i=0;i<walls.length;i++){
//     if(character.collidesWith(walls[i])){
//       // if character is below wall set up speed to 0
//       if(character.y > walls[i].y && direction == "up"){
//         character.speed.up = 0;
//         character.y = walls[i].y + 64;
//       }
//       if (character.y < walls[i].y && direction == "down"){
//         character.speed.down = 0;
//         character.y = walls[i].y - 64;
//       }
//       if (character.x > walls[i].x && direction == "left"){
//         character.speed.left = 0;
//         character.x = walls[i].x + 64;
//       }
//       if (character.x < walls[i].x && direction == "right"){
//         character.speed.right = 0;
//         character.x = walls[i].x - 64;
//       }
//     }

        
//       createjs.Sound.play("wall_collide");
//     }
// }


// function moveBackground(dir){
//   if(dir == "right"){
//     for(var i = 0; i<backgroundImages.length; i++){
//       backgroundImages[i].x -= (speed * backgroundImages[i].scrollRate);
//       if (backgroundImages[i].x <= -backgroundImages[i].image.width){
//         backgroundImages[i].x = backgroundImages[i].image.width - 100;
//       }
//     }
//   }
//    if(dir == "left"){
//     for(var i = 0; i<backgroundImages.length; i++){
//       backgroundImages[i].x += (speed * backgroundImages[i].scrollRate);
//     }
//   }
//   // when arrow key pressed backgroundImage.x += speed * backgroundImage.scrollRate
//   // if (backgroundImage.x <= -backgroundImage.image.width){ backgroundImage.x = backgroundImage.image.width;}
// }

// function moveObjects(dir){
//   for(var i = objectsToMove.length-1; i >= 0; i--){
//     if(dir == "right"){ objectsToMove[i].x -= speed;}
//     if(dir == "left"){ objectsToMove[i].x += speed;}

//       // if x is < 2000 and not added to stage
//       if(objectsToMove[i].x < 2000 && objectsToMove[i].x > 0 && objectsToMove[i].onStage == false){
//           objectsToMove[i].onStage = true;
//           myStage.addChild(objectsToMove[i]);
//           console.log("added child")
//       }
    
//     // if x is < -300 and is on the stage
//       if(objectsToMove[i].x < -300 && objectsToMove[i].onStage == true){
//           objectsToMove[i].onStage = false;
//           myStage.removeChild(objectsToMove[i]);
//           console.log("removed child")
//       }
        
//   }
// }


  
