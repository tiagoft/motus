// Begin "clearAll()" //
// -----------------------------------------------------------------------------------------------------------------------------//
function clearAll() {
// Clear all objects and create a new blank one //
    objects = [];
    let sy = new PH_Synth();
    let f = new Rectangle(0, 0, 0, 0, 0, 0, sy);
    objects.push(f);
}
// -----------------------------------------------------------------------------------------------------------------------------//

// Begin "preload()" //
// -----------------------------------------------------------------------------------------------------------------------------//
function preload() { 
// Preload all sounds to be used //
  sound1 = loadSound('assets/s1.mp3');
  sound2 = loadSound('assets/s2.mp3');
  sound3 = loadSound('assets/s3.mp3');
  
// Inicialize variables and proportions used for making fullscreen //
  let fs = fullscreen();
  fullscreen(!fs);
  proportionH = displayHeight/oldHeight;
  fullscreen(!fs);
  proportionW = windowWidth/liveFeedWidth;
  proportionWuni = (windowWidth - liveFeedWidth)/2;
  
}
// -----------------------------------------------------------------------------------------------------------------------------//

// Begin "saveAll()" //
// -----------------------------------------------------------------------------------------------------------------------------//
function saveAll() {
// Saves all objects onto a json file
   if(Fullscreen == true) {fullScreen();}
   let json = {};
   json.objects = [];
   for (let k = 0; k < objects.length; k++) {
     let object = {};
     saveLoad.saveJSON(object, objects[k]);
     json.objects.push(object);
   }
   saveJSON(json, 'Motus_settings.json');
}
// -----------------------------------------------------------------------------------------------------------------------------//

// -----------------------------------------------------------------------------------------------------------------------------//
function screenShot() {
  saveCanvas(myCanvas,"screenshot","png"); 
}
// -----------------------------------------------------------------------------------------------------------------------------//

// Begin "handleFile(file)" //
// -----------------------------------------------------------------------------------------------------------------------------//
function handleFile(file) {
// Waits for file to load then converts into json
  let data = JSON.stringify(file.data);
  jsonObj = JSON.parse(data);
  jsonReady = true;
  let col = color(0,255,0);
  buttonL.style('background-color', col);
}
// -----------------------------------------------------------------------------------------------------------------------------//

// Begin "loadAll()" //
// -----------------------------------------------------------------------------------------------------------------------------//
function loadAll() {
// Load all objects stored into loaded json
  if (jsonReady == false) {
   return; 
  }
  loading = true;
  jsonReady = false;
  let col = color(255,0,0);
  buttonL.style('background-color', col);
  objects = [];
  for(let o = 0; o < jsonObj.objects.length; o++) {
     let sy = new PH_Synth();
     let rectangle = new Rectangle(jsonObj.objects[o].x, jsonObj.objects[o].y, sound1, sound2, sound3, jsonObj.objects[o].slide, sy);
     saveLoad.loadJSON(jsonObj, rectangle, o);
     objects.push(rectangle);
  }
  loading = false;
}
// -----------------------------------------------------------------------------------------------------------------------------//

// Begin "fullScreen()" //
// -----------------------------------------------------------------------------------------------------------------------------//
function fullScreen() {
  if(Fullscreen == true) {Fullscreen = false;}
  else {Fullscreen = true;}
  let fs = fullscreen();
  let u;
  fullscreen(!fs);
  resizeCanvas(displayWidth, displayHeight);
  if(Fullscreen == true) {
    liveFeedWidth = windowWidth;
    dropzone.hide();
    slider.hide();
    buttonC.hide();
    buttonS.hide();
    buttonL.hide();
    buttonFS.hide();
    buttonSS.hide();
    mVolume.hide();
    for (let n = 0; n < objects.length; n++) {
       objects[n].h *= proportionH;
       objects[n].w *= proportionW;
       objects[n].setCoordinetesFS(((objects[n].x) - proportionWuni)*proportionW, ((objects[n].y)*proportionH));
    }
  }
  else {
    liveFeedWidth = 1000;
    dropzone.show();
    slider.show();
    buttonC.show();
    buttonS.show();
    buttonL.show();
    buttonFS.show();
    mVolume.show();
    buttonSS.show();
    for (let n = 0; n < objects.length; n++) {
       objects[n].h /= proportionH;
       objects[n].w /= proportionW;
       objects[n].setCoordinetesFS(((objects[n].x)/proportionW) + proportionWuni, ((objects[n].y)/proportionH));
    }
  }
}
// -----------------------------------------------------------------------------------------------------------------------------//

function keyPressed() {
  if(keyCode == ESCAPE && Fullscreen == true) {
    fullScreen();
  }
}

function highlight() {
  dropzone.style('background-color', '#bbb');
}

function unhighlight() {
  dropzone.style('background-color', '#eee');
}
