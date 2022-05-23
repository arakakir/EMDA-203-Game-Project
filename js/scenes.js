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
  
  {id:"Lobby Part 1",

   
   images: [
     {id: "Background", img:"images/LobbyRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
      // {id: "Bellhop", img:"images/BellhopSprite.png", loc: {x:0, y:2000}, animated: true, clickable: false},
      {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
      // {id: "Davey", img:"images/WalkieTalkie.png", loc: {x:0, y:2000}, animated: true, clickable: false},
     
     
     ],
   
   actions: [

     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "LobbyAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
       // {type: "animation", id: "Bellhop",
       //            animation: {wait: 0,
       //                        startPosition:{x:0, y:2000, alpha:1, rotation:0, scale:1},
       //                        endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
       //                        duration: 2000},
       //            trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Alright bellhop, you can do this! It’s your first day, gotta make a good first impression!", style: italicTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Davey",
                  animation: {wait: 0,
                              startPosition:{x:0, y:2000, alpha:1, rotation:0, scale:1},
                              endPosition:{x:0, y:0, alpha:1, rotation:0, scale:1},
                              duration: 2000},
                  trigger: "timer", duration: 2000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Davey", text: "Bellhop!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Bellhop", text: "Ack!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
       {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Bellhop", text: " What are you doing standing around??? Why aren’t you already out and about greeting our regulars???", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Bellhop", text: "Regulars? I didn’t know we had regulars... Isn’t this a hotel?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Textbox", img: "images/DaveyTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Bellhop", text: " Don’t question the game, bellhop! I need you to go check on the regulars, see if anyone needs anything, understand?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
      {type: "animation", id: "Textbox", img: "images/BellhopTextBox.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Bellhop", text: "Y-Yes sir!", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},

  
  {id:"Malakai's Room Part 1",

   
   images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
      {id: "Malakai", img:"images/MalakaiSpriteFlustered.png", loc: {x:0, y:2000}, animated: true, clickable: false},
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
     images: [
     {id: "Background", img:"images/MalakaiRoom.png", loc: {x:0, y:0}, animated: false, clickable: false},
     {id: "Malakai", img:"images/MalakaiSpriteBase.png", loc: {x:0, y:0}, clickable: false},
    {id: "Textbox", img:"images/BellhopTextBox.png", loc: {x:0, y:0}, animated: false, clickable: false},
     ],
    actions: [
       {type: "animation", id: "Background", img:"images/MalakaiRoom.png", trigger: "timer", duration: 1000, doNext: "nextAction"},
     {type: "animation", id: "Textbox", img:"images/BellhopTextBox.png", trigger: "auto", duration: 1000, doNext: "nextAction"},
     {type: "sound", src: "MalakaiAmbience", volume: 1.0, loop: -1, trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Bellhop", text: "Good to meet you Malakai. I’m (y/n). Quick question: is that a cow? \rAre you allowed to have a cow here?", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
        {type: "animation", id: "Textbox", img: "images/MalakaiTextBox.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Oh, yeah. That’s Belemy; she’s a sweetheart. She’s not not allowed to \rbe here, I don’t think. I didn’t read anything about a no cow policy in \rthe contract when I moved in.", style: whiteTextStyle,
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "nextAction", hideAfter:1},
     {type: "animation", id: "Malakai", img: "images/MalakaiSpriteDread.png", trigger: "auto", doNext: "nextAction"},
     {type: "text", speaker: "Malakai", text: "Oh God, do you think Davie would kick her out? She’s my only source of \rincome. Oh God, how am I gunna afford living here?", 
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
            loc: {x:250,y:800}, trigger: "stageClick", duration: 3000, doNext: "Malakai's Room Part 2", style: whiteTextStyle, hideAfter:1},
     {type: "animation", id: "Malakai", img: "images/MalakaiSpriteBase.png", trigger: "auto", doNext: "nextAction"},
       {type: "text", speaker: "Malakai", text: "Sorry about that, I got kinda a lot going on right now, but I really appreciate your secrecy.", 
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
            loc: {x:250,y:800}, trigger: "stageClick", duration: 2000, doNext: "Elevator", hideAfter:1},
    ]}]
// ]