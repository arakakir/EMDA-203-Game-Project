/////////////////////////////
//      DEFINE STYLES      //
////////////////////////////

var defaultStyle = {style: "bold 30px Courier", color: "#cccccc", alpha: 1, lineWidth: 50, lineHeight: 50};
var italicTextStyle = {style: "bold italic 30px Courier", color: "#cccccc", alpha: 1, lineWidth: 50, lineHeight: 50};
var whiteTextStyle = {style: "bold 30px Courier", color: "#cccccc", alpha: 1, lineWidth: 50, lineHeight: 50};
var choice1TextStyle = {style: "bold 30px Courier", color: "#55E8F0", alpha: 1, lineWidth: 50, lineHeight: 50};
var choice2TextStyle = {style: "bold 30px Courier", color: "#F055A5", alpha: 1, lineWidth: 50, lineHeight: 50};


/////////////////////////////
//      DEFINE SCENES     //
////////////////////////////

var scenes = [
  {id:"Malakai's Room Part 1",

   
   images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Malakai", img:"images/MalakaiSpriteFlustered.png", loc: {x:0, y:2000}, animated: true, clickable: false},
         {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:-200, y:0}, animated: false, clickable: false},
     
     
     ],
   
   actions: [
     {type: "animation", id: "Background", img:"images/MalakaiRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Narrator", text: "You enter a filthy room; there’s clothes everywhere, and it smells like\ra barn. You see a man hunched over a desk; he looks stressed. \rWhat the hell?", style: italicTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "text", speaker: "Bellhop", text: "Hello?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
  {type: "animation", id: "Malakai",
                  animation: {wait: 0,
                              startPosition:{x:0, y:2000, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 2000},
                  trigger: "stageClick", doNext: "nextAction"},
     {type: "animation", id: "Malakai", img: "images/MalakaiSpriteBase.png", trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/MalakaiTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Hey there, sweetheart. Davie told me there was a new bellhop in town; \rdidn’t expect ya’ to be so damn cute, though. What can I do for you?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     // {type: "text", speaker: "Bellhop", text: "The slingshot is the gravity \rof the sun.", 
     //        loc: {x:550,y:520}, trigger: "stageClick", doNext: "nextAction", style: blackTextStyle},
//      {type: "text", speaker: "Villain", text: "The stone is I, and you are the target.", 
//             loc: {x:800,y:200}, trigger: "stageClick", doNext: "nextAction", style: whiteTextStyle},
//      // {type: "text", speaker: "Villain", text: "There is no attraction, \ras the force of our common star-\ra body so colossal it cannot \rbe called 'object'...", 
//      //        loc: {x:800,y:200}, trigger: "stageClick", doNext: "nextAction", style: whiteTextStyle},
//           {type: "text", speaker: "Hero", text: "There is no attraction, \ras the force of our common star-\ra body so colossal it cannot \rbe called 'object'...", 
//             loc: {x:550,y:520}, trigger: "stageClick", doNext: "nextAction", style: blackTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Oh, uhm. I’m just checking in; Mr. Jonas told me to come meet the regulars? \rAre regulars a thing at hotels?", style: choice1TextStyle,loc: {x:250,y:800}, 
            trigger: "choice", doNext: "MalakaiResponse1", hideAfter:2},
     {type: "text", speaker: "Bellhop", text: "Better now that I’ve met you. It’s been a weird day…", style: choice2TextStyle,loc: {x:250,y:900}, 
            trigger: "lastchoice", doNext: "MalakaiResponse2"}]},
  
  
  
  
  
  
   {id:"MalakaiResponse1", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [

     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai Laugh", img:"images/MalakaiSpriteLaughing.png", loc: {x:0, y:0}, clickable: false},
     {id: "Malakai Text Box", img:"images/MalakaiTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Malakai", text: "They are at this one, sweetheart. It’s a pleasure to meet you. \rThe name’s Malakai Whitney. Welcome to the Inn.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Malakai's Room Part 2", style: whiteTextStyle, hideAfter:1}]},
 
  
  
  
  
  {id:"MalakaiResponse2", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai Base", img:"images/MalakaiSpriteBase.png", loc: {x:0, y:0}, clickable: false},
    {id: "Malakai Base", img:"images/MalakaiSpriteFlustered.png", loc: {x:0, y:0}, clickable: false},
     {id: "Malakai Text Box", img:"images/MalakaiTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Malakai", text: "Well, hell. That’s awfully sweet of you, dalrin’. Glad I could make \ryour day a little better for ya’. Name’s Malakai Whitney.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Malakai's Room Part 2", style: whiteTextStyle}]},
  
 
  
  
  
  
  {id:"Malakai's Room Part 2", 
     images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai Base", img:"images/MalakaiSpriteBase.png", loc: {x:0, y:0}, clickable: false},
     {id: "Malakai Text Box", img:"images/MalakaiTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
    {id: "Bellhop Text Box", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
        {type: "text", speaker: "Bellhop", text: "Good to meet you Malakai. I’m (y/n). Quick question: is that a cow? Are you allowed to have a cow here?", 
            loc: {x:800,y:200}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
       {type: "animation", id: "Malakai ",
                  animation: {wait: 0,
                              startPosition:{x:0, y:-800, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 3000},
                  clickable: false, doNext: "nextAction"},
       {type: "text", speaker: "Malakai", text: "Oh, yeah. That’s Belemy; she’s a sweetheart. She’s not not allowed to be here, I don’t think. I didn’t read anything about a no cow policy in the contract when I moved in.", 
            loc: {x:800,y:200}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle}
    ]}]
// ]