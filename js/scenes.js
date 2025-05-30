/////////////////////////////
//      DEFINE STYLES      //
////////////////////////////

var defaultStyle = {style: "bold 30px Courier", color: "#FFF9F9", alpha: 1, lineWidth: 50, lineHeight: 50};
var italicTextStyle = {style: "bold italic 30px Courier", color: "#cccccc", alpha: 1, lineWidth: 50, lineHeight: 50};
var whiteTextStyle = {style: "bold 30px Courier", color: "#cccccc", alpha: 1, lineWidth: 50, lineHeight: 50};
var choice1TextStyle = {style: "bold 30px Courier", color: "#55E8F0", alpha: 1, lineWidth: 50, lineHeight: 50};
var choice2TextStyle = {style: "bold 30px Courier", color: "#F055A5", alpha: 1, lineWidth: 50, lineHeight: 50};
var txtboxStyle = {style: "bold 30px Courier", color: "#000000", alpha: 1, lineWidth: 50, lineHeight: 50};


/////////////////////////////
//      DEFINE SCENES     //
////////////////////////////




var scenes = [
  
  
  {id:"Title Screen",
   images: [
     {id: "Background", img:"images/Title.png", reg: {x:0, y: 0}, loc: {x:0, y:0}, reg: {x:0, y: 0}, animated: false, clickable: false},
    ],
   actions: [
    {type: "sound", src: "ElevatorAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
    {type: "text", speaker: "Narrator", text: "Click here to start! \rClick screen to progress \rthe story.", style: defaultStyle,
            loc: {x:100,y:800}, trigger: "stageClick", duration: 2000, doNext: "Choose Your Character", hideAfter:1}
   ]
  },        
     
  {id: "Choose Your Character",
    images: [
      {id: "Background", img:"images/ChooseYourCharBackground.png", reg: {x:0, y: 0}, loc: {x:0, y:0}, reg: {x:0, y: 0}, animated: false, clickable: false},     
      {id: "CharOptions", img: "images/ChooseYourChar.png", loc: {x:0, y:0}, animated: false, clickable: false},
    ],
    actions: [
        {type: "text", speaker: "Narrator", text: "", style: defaultStyle,
          loc: {x:500,y:25}, trigger: "stageClick", duration: 2000, doNext: "Beach1", hideAfter:1
        }
    ]
  },
     
     
  
  {id:"Beach1",

   
   images: [
     {id: "Background", img:"images/Beach.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Confused", img:"images/JamieConfused.png", loc: {x:100, y:2000}, animated: true, clickable: false},
      {id: "Textbox", img:"images/CharTxtbox.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Left", img: "images/JamieLeft.png", loc: {x:100, y:2000}, animated: true, clickable: false},
     ],
   
   actions: [
     {type: "animation", id: "Textbox", img:"images/CharTxtbox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "LobbyAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
       {type: "animation", id: "Confused",
                  animation: {wait: 0,
                              startPosition:{x:100, y:2000, alpha:1, rotation:0, scale:1},
                              endPosition:{x:100, y:543, alpha:1, rotation:0, scale:1},
                              duration: 2000},
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "text", speaker: "Char", text: "Where am I?", style: txtboxStyle,
            loc: {x:200,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "text", speaker: "Char", text: "Wait...", style: txtboxStyle,
            loc: {x:200,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Confused",
                  animation: {wait: 0,
                              startPosition:{x:100, y:543, alpha:1, rotation:0, scale:1},
                              endPosition:{x:100, y:2000, alpha:1, rotation:0, scale:1},
                              duration: 0},
                  trigger: "timer", duration: 0, doNext: "nextAction"},
    {type: "animation", id: "Textbox", img:"images/CharTxtbox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
    {type: "animation", id: "Left",
                  animation: {wait: 0,
                              startPosition:{x:0, y:2000, alpha:1, rotation:0, scale:1},
                              endPosition:{x:100, y:543, alpha:1, rotation:0, scale:1},
                              duration: 0},
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "text", speaker: "Char", text: "I was...", style: txtboxStyle,
            loc: {x:200,y:800}, trigger: "stageClick", duration: 2000, doNext: "Suitcase", hideAfter:1},
    ],
  },

  
  {id: "Suitcase",
    images: [      
      {id: "Textbox", img:"images/CharTxtbox.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Full", img: "FullSuitcase.png", reg: {x:0, y: 0}, loc: {x:0, y:0}, reg: {x:0, y: 0}, animated: false, clickable: false},
      {id: "Pic", img: "PicSuitcase.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Bars", img: "BarsSuitcase.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Confused", img:"images/JamieConfused.png", loc: {x:100, y:800}, animated: true, clickable: false},
      {id: "Neutral", img: "images/JamieNeutral.png", loc: {x:100, y:800}, animated: true, clickable: false},
      ] ,
   
   actions:[
    {type: "sound", src: "LobbyAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
    {type: "animation", id: "Textbox", img:"images/CharTxtbox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
   ],
  },
  
   {id:"Elevator",

   
   images: [
     {id: "Background", img:"images/ElevatorRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Bellhop", img:"images/BellhopSprite.png", loc: {x:0, y:2000}, animated: true, clickable: false},
     {id: "MalakaiButton", img:"images/MalakaiButton.png", loc: {x:255, y:395}, scale: 0.2, animated: true, clickable: true},
     {id: "JackButton", img:"images/JackButton.png", loc: {x:255, y:505}, scale: 0.2, animated: true, clickable: true},
     {id: "LobbyButton", img:"images/LobbyButton.png", loc: {x:595, y:625}, scale: 0.2, animated: true, clickable: true},
     ],
   
   actions: [
     {type: "sound", src: "ElevatorAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "MalakaiButton", img:"images/MalakaiButton.png",trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "JackButton", img:"images/JackButton.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "LobbyButton", img:"images/LobbyButton.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Bellhop",
                  animation: {wait: 0,
                              startPosition:{x:0, y:2000, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 2000},
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
        {type: "image", id: "JackButton", 
            trigger: "choice", doNext: "Jack's Room Part 1", hideAfter:1},
     {type: "image", id: "MalakaiButton", 
            trigger: "choice", doNext: "Malakai's Room Part 1", hideAfter:1},
   {type: "image", id: "LobbyButton", 
            trigger: "lastchoice", doNext: "Lobby Part 2", hideAfter:1}]},

  
  
  
  
  {id:"Malakai's Room Part 1",

   
   images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Malakai", img:"images/MalakaiSpriteFlustered.png", loc: {x:0, y:2000}, scale: 1, animated: true, clickable: false},
         {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     
     
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
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "animation", id: "Malakai", img: "images/MalakaiSpriteBase.png", trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/MalakaiTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Hey there, sweetheart. Davie told me there was a new bellhop in town; \rdidn’t expect ya’ to be so damn cute, though. What can I do for you?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
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
     // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
     images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai", img:"images/MalakaiSpriteBase.png", loc: {x:0, y:0}, clickable: false},
    {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"}, 
      {type: "animation", id: "Background", img:"images/MalakaiRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Good to meet you Malakai. I’m (y/n). Quick question: is that a cow? \rAre you allowed to have a cow here?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
        {type: "animation", id: "Textbox", img: "images/MalakaiTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Oh, yeah. That’s Belemy; she’s a sweetheart. She’s not NOT allowed to \rbe here, I don’t think. I didn’t read anything about a no cow policy in \rthe contract when I moved in.", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Malakai", img: "images/MalakaiSpriteDread.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Oh God, do you think Davey would kick her out? She’s my only source of \rincome. Oh God, how am I gunna afford living here?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Narrator", text: "Malakai’s spiraling out of control. You should handle this, right? Mr. \rJonas told you to help the regulars with anything they needed, right?", style: italicTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "text", speaker: "Bellhop", text: "Hey, it’s okay, I promise I won’t tell anyone. So, even if she’s not \rallowed, Mr. Jonas doesn’t need to know!", style: choice1TextStyle,loc: {x:250,y:800}, 
            trigger: "choice", doNext: "MalakaiResponse3", hideAfter:2},
     {type: "text", speaker: "Bellhop", text: "Shh. Calm down, pet. I won’t let anything bad happen to you, okay?", style: choice2TextStyle,loc: {x:250,y:900}, 
            trigger: "lastchoice", doNext: "MalakaiResponse4"}]},
  
     {id:"MalakaiResponse3", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [

     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai Laugh", img:"images/MalakaiSpriteLaughing.png", loc: {x:0, y:0}, clickable: false},
     {id: "Malakai Text Box", img:"images/MalakaiTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Malakai", text: "Oh, thank GOD.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle, hideAfter:1},
     {type: "animation", id: "Malakai", img: "images/MalakaiSpriteBase.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Malakai", text: "Sorry about that, I got kinda a lot going on right now, but I \rreally appreciate your secrecy.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Malakai's Room Part 3", style: whiteTextStyle, hideAfter:1}]},
 
  
  
  
  
  {id:"MalakaiResponse4", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
    {id: "Malakai Base", img:"images/MalakaiSpriteFlustered.png", loc: {x:0, y:0}, clickable: false},
     {id: "Malakai Text Box", img:"images/MalakaiTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Malakai", text: "Oh. Well, shit. Alright, then. Ahem. That’s, uh, that’s real nice of you. \rThank you.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Malakai's Room Part 3", style: whiteTextStyle}]},
  
  
  
  
   {id:"Malakai's Room Part 3", 
     images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai", img:"images/MalakaiSpriteBase.png", loc: {x:0, y:0}, clickable: false},
    {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
       {type: "animation", id: "Background", img:"images/MalakaiRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Sure thing! Did you need anything else before I go?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
        {type: "animation", id: "Textbox", img: "images/MalakaiTextBox.png", trigger: "auto", doNext: "nextAction"},
         {type: "animation", id: "Malakai", img: "images/MalakaiSpriteLaughing.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Well, not at the moment, but I’m planning on going shootin’ later if \ryou’d care to come with?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
       {type: "animation", id: "Malakai", img: "images/MalakaiSpriteFlustered.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "No pressure, of course. I just enjoy your company.", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Malakai", img: "images/MalakaiSpriteBase.png", trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Oh, uh. I’ll definitely think about it. I have to go, but have a good \rrest of your day!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Textbox", img: "images/MalakaiTextBox.png", trigger: "auto", doNext: "nextAction"}, 
       {type: "text", speaker: "Malakai", text: "You too, sweetheart. Thanks for stopping by, and I hope to see you later~", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "Elevator", hideAfter:1}]},
// ]


  {id:"Jack's Room Part 1",

   
   images: [
     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Jack", img:"images/JackSpriteBase.png", loc: {x:0, y:2000}, scale: 1, animated: true, clickable: false},
         {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     
     
     ],
   
   actions: [
     {type: "animation", id: "Background", img:"images/JackRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Narrator", text: "The room is empty and cold. Shivers go down your spine as you look around.", style: italicTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "text", speaker: "Bellhop", text: "Hello?.. Is anyone home?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
  {type: "animation", id: "Jack",
                  animation: {wait: 0,
                              startPosition:{x:0, y:2000, alpha:0, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 2000},
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/JackTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Jack", text: "BOO!", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "AAaAAhH!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Jack", img: "images/JackSpriteSmile.png", trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/JackTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Jack", text: "Ha! You must be the new bellhop! Welcome to my beloved suite~", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
       {type: "text", speaker: "Jack", text: "This is where all the magic happens.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Certainly looks… magical.", style: choice1TextStyle,loc: {x:250,y:800}, 
            trigger: "choice", doNext: "JackResponse1", hideAfter:2},
     {type: "text", speaker: "Bellhop", text: "Oh god. Are those g-ghosts?!", style: choice2TextStyle,loc: {x:250,y:900}, 
            trigger: "lastchoice", doNext: "JackResponse2"}]},
  
  
  
  
  
  
   {id:"JackResponse1", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [

     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Jack", img:"images/JackSpriteHorny.png", loc: {x:0, y:0}, clickable: false},
     {id: "Textbox", img:"images/JackTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Jack", text: "Oh, it is. Believe me.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Jack's Room Part 2", style: whiteTextStyle, hideAfter:1}]},
 
  
  
  
  
  {id:"JackResponse2", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [
     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Jack", img:"images/JackSpriteSmile.png", loc: {x:0, y:0}, clickable: false},
     {id: "Textbox", img:"images/JackTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Jack", text: "Ah, don’t worry about them, honey. They’re alright!", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Jack's Room Part 2", style: whiteTextStyle}]},
  
 
  
  
  
  
  {id:"Jack's Room Part 2", 
     images: [
     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Jack", img:"images/JackSpriteBase.png", loc: {x:0, y:0}, clickable: false},
    {id: "Textbox", img:"images/JackTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
       {type: "animation", id: "Background", img:"images/JackRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/JackTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Jack", text: "My name is ☠ j̶̢̦͓̝̹̒̂̔͂j̶̻̺͛j̶̢̲̳̟͓̄͊j̸̡̟̯̅̿̄͝j̶͎̱̤̉̀j̶̨̖͆̊̀ ☠ but most people just \rcall me Jack. You must be the new bellhop, lovely to meet you.", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
        {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Are those ghosts screaming? Are they alright?? Is your room haunted???", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Textbox", img: "images/JackTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "Jack", img: "images/JackSpriteSmile.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Jack", text: "I got my suite to connect to my home realm, making this a portal to Hell \rof sorts. Makes the suite feel like home.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
       {type: "text", speaker: "Jack", text: "I am the king of Hell’s right hand man after all!", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "That explains why it's so cold in here.", style: choice1TextStyle,loc: {x:250,y:800}, 
            trigger: "choice", doNext: "JackResponse3", hideAfter:2},
     {type: "text", speaker: "Bellhop", text: "That’s sick! You must be a powerful sorcerer!", style: choice2TextStyle,loc: {x:250,y:900}, 
            trigger: "lastchoice", doNext: "JackResponse4"}]},
  
     {id:"JackResponse3", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [

     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Jack", img:"images/JackSpriteHorny.png", loc: {x:0, y:0}, clickable: false},
     {id: "Textbox", img:"images/JackTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Jack", text: "I have my ways of heating it up~", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Jack's Room Part 3", style: whiteTextStyle, hideAfter:1}]},
 
  
  
  
  
  {id:"JackResponse4", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [
     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
    {id: "Jack", img:"images/JackSpriteSmile.png", loc: {x:0, y:0}, clickable: false},
     {id: "Textbox", img:"images/JackTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Jack", text: "Why yes actually, thank you for noticing. I don’t usually get much \rrecognition for it.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Jack's Room Part 3", style: whiteTextStyle}]},
  
  
  
  
   {id:"Jack's Room Part 3", 
     images: [
     {id: "Background", img:"images/JackRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Jack", img:"images/JackSpriteBase.png", loc: {x:0, y:0}, clickable: false},
    {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
       {type: "animation", id: "Background", img:"images/JackRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
        {type: "sound", src: "JackAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "What is it like? Working in… Hell?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
        {type: "animation", id: "Textbox", img: "images/JackTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Jack", text: "I get most of the paperwork that the boss doesn’t want to deal with. \rI also do a lot of his dirty work, like dealing with unruly souls and… \rother things.", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
       {type: "animation", id: "Jack", img: "images/JackSpriteSmile.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Jack", text: "Don’t get me wrong, I love Hell! But my job is exhausting. I usually \rcome here on my days off to relax. The spa here is absolutely to die for~", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Jack", img: "images/JackSpriteBase.png", trigger: "auto", doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Oh, well, I haven't personally gotten the chance to check it out yet, \rbut I’ve heard great things!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Textbox", img: "images/JackTextBox.png", trigger: "auto", doNext: "nextAction"}, 
       {type: "text", speaker: "Jack", text: "Well if you ever have a free moment, I’d love to take you sometime! \rI actually got a coupon for a free couple’s massage that I’ve been \rwanting to use..", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Jack", img: "images/JackSpriteSmile.png", trigger: "auto", doNext: "nextAction"},
      {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Oh! That's so nice of you! I am kinda busy, but I’ll definitely \rconsider it!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
       {type: "animation", id: "Textbox", img: "images/JackTextBox.png", trigger: "auto", doNext: "nextAction"}, 
       {type: "text", speaker: "Jack", text: "Wonderful! I hope to see you there, honey~", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "Elevator", hideAfter:1}
    ]},
  
  
  
  
  
 {id:"Lobby Part 2",

   
   images: [
     {id: "Background", img:"images/LobbyRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Davey", img:"images/DaveySprite.png", loc: {x:0, y:2000}, scale: 1, animated: true, clickable: false},
         {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     
     
     ],
   
   actions: [
     {type: "animation", id: "Background", img:"images/LobbyRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "LobbyAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Narrator", text: "The lobby is quiet at this time of day… Not a lot of people checking \rin this afternoon.", style: italicTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
  {type: "animation", id: "Davey",
                  animation: {wait: 0,
                              startPosition:{x:0, y:2000, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 2000},
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Davey", text: "BELLHOP!", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
      {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "AHHH!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Davey", text: "Ha! Great enthusiasm, Bellhop. Love to see it.", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Thank… You…?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Davey", text: "Well Bellhop, it’s the end of your first shift. Your first day on the job! \rHow did it go?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Oh, it was… okay… A bunch of the patrons asked me out, I think?", style: choice1TextStyle,loc: {x:250,y:800}, 
            trigger: "choice", doNext: "DaveyResponse1", hideAfter:2},
     {type: "text", speaker: "Bellhop", text: "Uhhh… I don’t think I finished greeting everyone.", style: choice2TextStyle,loc: {x:250,y:900}, 
            trigger: "lastchoice", doNext: "DaveyResponse2"}]},
  
  
  
  
  
  
   {id:"DaveyResponse1", 
    // sound: {src: "MalakaiAmbience.mp3", volume: 1.0, loop: -1},
    images: [

     {id: "Background", img:"images/LobbyRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai Laugh", img:"images/DaveySprite.png", loc: {x:0, y:0}, clickable: false},
     {id: "Textbox", img:"images/DaveyTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "LobbyAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Davey", text: "They what?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle, hideAfter:1},
    {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "I didn’t give them any answers, though! I know that’s probably not \rprofessional.", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
       {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Davey", text: "Screw professional, Bellhop! Who are you choosing?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
       {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Bellhop", text: "Excuse me?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Davey", text: "Who are you going out on a date with?", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "nextAction", style: whiteTextStyle},
           {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},       
      {type: "text", speaker: "Bellhop", text: "Uhhh, I guess...", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "text", speaker: "Bellhop", text: "Malakai", style: choice1TextStyle,loc: {x:250,y:800}, 
            trigger: "choice", doNext: "Malakai End Card", hideAfter:2},
     {type: "text", speaker: "Bellhop", text: "Jack", style: choice2TextStyle,loc: {x:250,y:900}, 
            trigger: "lastchoice", doNext: "Jack End Card"}
    ]},
 
  
  
  {id:"DaveyResponse2", 
 
    images: [
     {id: "Background", img:"images/LobbyRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Davey", img:"images/DaveySprite.png", loc: {x:0, y:0}, clickable: false},
     {id: "Textbox", img:"images/DaveyTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "LobbyAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
      {type: "text", speaker: "Davey", text: "WHAT?! Bellhop, get your ass back in that elevator this instant!", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Elevator", style: whiteTextStyle}]},
  
      
      
      
    {id:"Jack End Card", 
  
    images: [
     {id: "Endcard", img:"images/JackEndcard.png", loc: {x:0, y:0}, scale: 1, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "JackEndcardAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
    {type: "text", speaker: "Narrator", text: "", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Credits", style: whiteTextStyle}]},
  
     
  {id:"Malakai End Card", 
  
    images: [
     {id: "Endcard", img:"images/MalakaiEndcard.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
      {type: "sound", src: "MalakaiEndcardSong", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
    {type: "text", speaker: "Narrator", text: "", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Credits", style: whiteTextStyle}]},
  
  
  
  
      {id:"Credits", 
  
    images: [
     {id: "Endcard", img:"images/Credits.png", loc: {x:0, y:0}, scale: 2, animated: false, clickable: false},
     ],
    actions: [
    {type: "text", speaker: "Narrator", text: "", 
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Title Screen", style: whiteTextStyle}]}
    
  ]