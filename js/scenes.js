/////////////////////////////
//      DEFINE STYLES      //
////////////////////////////

var defaultStyle = {style: "bold 20px Helvetica", color: "red", alpha: 1, lineWidth: 50};
var whiteTextStyle = {style: "bold 20px Courier", color: "#cccccc", alpha: 1, lineWidth: 50};
var blackTextStyle = {style: "bold 20px Courier", color: "#222222", alpha: 1, lineWidth: 50};


/////////////////////////////
//      DEFINE SCENES     //
////////////////////////////

var scenes = [
  {id:"Malakai's Room",
   sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
   
   images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai Base", img:"images/MalakaiSpriteBase.png", loc: {x:0, y:0}, clickable: false},
     // {id: "Text Box", img:"images/MalakaiTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
   
   actions: [
     // {type: "animation", id: "background", img:"images/bg.png", clickable: false, trigger: "timer", duration: 1000, doNext: "nextAction"},
     // {type: "animation", id: "character",
     //              animation: {wait: 0,
     //                          startPosition:{x:400, y:700, alpha:1, rotation:0, scaleX:0.75, scaleY:0.75},
     //                          endPosition:{x:400, y:510, alpha:1, rotation:0, scaleX:1, scaleY:1},
     //                          duration: 3000},
                  // clickable: true, onClick:"smile", trigger: "stageClick", doNext: "nextAction"},
     {type: "text", speaker: "Narrator", text: "You enter a filthy room; there’s clothes everywhere, and it smells like a barn. You see a man hunched over a desk; he looks stressed. What the hell?", style: blackTextStyle,
            loc: {x:550,y:520}, trigger: "timer", duration: 1000, doNext: "nextAction", hideAfter:2},
         {type: "text", speaker: "Bellhop", text: "Hello?", style: blackTextStyle,
            loc: {x:550,y:520}, trigger: "timer", duration: 0, doNext: "nextAction", hideAfter:2},
     {type: "animation", id: "Malakai Flustered",
                  animation: {wait: 0,
                              startPosition:{x:0, y:-800, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 3000},
                  clickable: false, doNext: "nextAction"},
     {type: "animation", id: "Malakai Base",
                  animation: {wait: 1000,
                              startPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 3000},
                  clickable: false, doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Hey there, sweetheart. Davie told me there was a new bellhop in town; didn’t expect ya’ to be so damn cute, though.", 
            loc: {x:800,y:200}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
//      {type: "text", speaker: "Bellhop", text: "The slingshot is the gravity \rof the sun.", 
//             loc: {x:550,y:520}, trigger: "stageClick", doNext: "nextAction", style: blackTextStyle},
//      {type: "text", speaker: "Villain", text: "The stone is I, and you are the target.", 
//             loc: {x:800,y:200}, trigger: "stageClick", doNext: "nextAction", style: whiteTextStyle},
//      // {type: "text", speaker: "Villain", text: "There is no attraction, \ras the force of our common star-\ra body so colossal it cannot \rbe called 'object'...", 
//      //        loc: {x:800,y:200}, trigger: "stageClick", doNext: "nextAction", style: whiteTextStyle},
//           {type: "text", speaker: "Hero", text: "There is no attraction, \ras the force of our common star-\ra body so colossal it cannot \rbe called 'object'...", 
//             loc: {x:550,y:520}, trigger: "stageClick", doNext: "nextAction", style: blackTextStyle},
//      {type: "animation", text: "", id: "character", 
//                   animation: {wait: 0,
//                               startPosition:{scale:1},
//                               endPosition:{x:780, y: 600, scale:1.4},
//                               duration: 3000}, trigger: "stageClick", duration: 4000, doNext: "nextAction"},
//      {type: "text", speaker: "Choice", text: "Take the door on the left", loc: {x:950,y:620}, 
//             trigger: "choice", doNext: "scene2a", hideAfter:2},
//      {type: "text", speaker: "Choice", text: "Take the door on the right", loc: {x:950,y:690}, 
//             trigger: "lastchoice", doNext: "scene2b"}]},
  
//    {id:"Elevator", 
//     sound: {src: "ElevatorAmbience.mp3", volume: 1.0, loop: -1},
//     images: [
//      {id: "Background", img:"images/Elevator.png", loc: {x:0, y:0}, animated: false, clickable: false},
//      {id: "MalakaiButton", img:"images/MalakaiButton.png", loc: {x:0, y:0}, clickable: true, onClick: "Malakai's Room"},
//       {id: "JackButton", img:"images/JackButton.png", loc: {x:0, y:0}, clickable: true, onClick: "Jack's Room"},
//        {id: "CardemumButton", img:"images/CardemumButton.png", loc: {x:0, y:0}, clickable: true, onClick: "Cardemum's Room"},
//        {id: "PippinButton", img:"images/PippinButton.png", loc: {x:0, y:0}, clickable: true, onClick: "Pippin's Room"},
//      ],
//     actions: []},
  
//    {id:"scene2b", actions: []}
// ]