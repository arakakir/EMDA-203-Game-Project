/* global createjs, myStage, hero, bg, appState, stageWidth, stageHeight */

//	********************************************************************	
//	**********************		Preload Setup 		********************	
//	********************************************************************
	// Preload Variables
	var thingsToLoad = [ 												// 	'thingsToLoad' is an ARRAY of OBJECTS. Syntax:  [ {}, {}, {} ]					
		{id: "hero", src: "images/hero2.png"},
		{id: "thornton", src: "images/thorntonSprite02.png"},								
		{id: "target01", src: "images/target01Crop.png"},						
		{id: "target02", src: "images/target02Crop.png"},						
		{id: "target03", src: "images/target03Crop.png"},
		{id: "bomb", src: "images/bomb.png"},
		{id: "cloud01", src: "images/cloud01.png"},
		{id: "bgNeutral", src: "images/bgNeutral.png"},
		{id: "bg01", src: "images/bg01.png"},	
		{id: "bg02", src: "images/bg02.png"},
		{id: "bg03", src: "images/bg03.png"},
		{id: "bg04", src: "images/bg04.png"},
		{id: "bg05", src: "images/bg05.png"},
		{id: "bg06", src: "images/bg06.png"},
		{id: "bg07", src: "images/bg07.png"},
		{id: "bg08", src: "images/bg08.png"},
		{id: "bg09", src: "images/bg09.png"},
		{id: "bg10", src: "images/bg10.png"},
		{id: "gameOverDull", src: "images/gameOverDull.png"},	
		{id: "youWin", src: "images/youWin.png"},				
		{id: "wind", src: "sounds/wind-fades.ogg"},
		{id: "bell1", src: "sounds/bell1.mp3", data: 10},		// the "data" property sets how many instances of the sound can play at once
		{id: "bell2", src: "sounds/bell2.mp3", data: 10},
		{id: "bell3", src: "sounds/bell3.mp3", data: 10},
		{id: "bell4", src: "sounds/bell4.mp3", data: 10},
		{id: "bell5", src: "sounds/bell5.mp3", data: 10},
		{id: "bell6", src: "sounds/bell6.mp3", data: 10},
		{id: "bell7", src: "sounds/bell7.mp3", data: 10},
		{id: "bell8", src: "sounds/bell8.mp3", data: 10},
		{id: "atmosphereStrings", src: "sounds/ERH_AtmosString_mix_43Sec.mp3", data: 1},
		{id: "firework", src: "sounds/firework_single_rocket.mp3", data: 10}				
	];

	var myQueue = new createjs.LoadQueue(false);	//(preferXHR)			// 	createjs.LoadQueue's got them methods...
	createjs.Sound.alternateExtensions = ["mp3"];
	myQueue.installPlugin(createjs.Sound);								// *** causes cross - origin errors unless remote
	myQueue.on("fileload", handleFileLoad, this);						// 	fires when a file has finished loading
	myQueue.on("loadstart", handleLoadStart, this);
	myQueue.on("complete", handleLoadComplete, this);					// 	fires when the entire array has finished loading

//	********************************************************************
//	**********************		Preload Functions 		****************
//	********************************************************************
	function initPreload(){	
		appState = STATE_PLAY_PRELOAD;														
		console.log("AppState 1: INIT_PRELOAD");
		myQueue.loadManifest(thingsToLoad);					  //	tell the createjs.LoadQueue to load the 'thingsToLoad' arrray					
	}
  function handleLoadStart(){								      // 	called by myQueue.on() Tells us preload has begun and displays preload text
      console.log("AppState 2: PRELOADING");
      bg = new createjs.Text("PRELOADING!", "40px Arial", "orchid");
      bg.x = 450;
      bg.y = 450;
      myStage.addChild(bg);
      myStage.update();
    }
	function handleFileLoad(e){								      //	reports when each item has finished loading
		//console.log(e);
		console.log(e.item.id);
		console.log("Loaded: "+ e.item.id);
		if(e.item.id=="thornton"){
			initSpriteData();
		}
		if(e.item.id=="hero"){
			console.log("consolation")
			hero = new createjs.Bitmap(myQueue.getResult("hero"));
			myStage.addChild(hero);
			hero.x = stageHeight/4;
			hero.y = stageWidth/4;
			hero.rotation = -90;
		}
		//console.log("Loaded: "+ event);
	}
	function handleLoadComplete(){							  //	  once the thingsToLoad array has finished loading, change state
		myStage.removeAllChildren();                //    adding this to clear preload sc
		hero = null;
		bg = null;
		appState = STATE_INIT_GAMESTART;
	}