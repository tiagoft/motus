function setup() { // Begin "setup()" //

// Inicialize live feed from webcam and create background //  
//-----------------------------------------------------------------------------//
  myCanvas = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  live_feed = createCapture(VIDEO);
  live_feed.size(640, 480);
  live_feed.hide();
  preLiveFeed = createImage(640, 480, RGB);
  background(0);
//-----------------------------------------------------------------------------//

// Inicialize first blank object and controllers //
//-----------------------------------------------------------------------------//
  let sy = new PH_Synth();
  let z = new Rectangle(0, 0, 0, 0, 0, 0, sy);
  objects.push(z);
  saveLoad = new Rect_SL();
  rectView = new Rect_View();
//-----------------------------------------------------------------------------//

// Create general control buttons //
//-----------------------------------------------------------------------------//
  mVolume = createElement('mVolume', 'Master Volume');
  mVolume.position(25, 40);
  mVolume.style('color', '#fff');
  dropzone = createElement('dropzone', 'Drag load file here');
  dropzone.position(windowWidth - ((windowWidth - liveFeedWidth)/2) + 7, windowHeight - 85);
  dropzone.style('color', '#000');
  dropzone.style('background-color', '#eee');
  dropzone.style('font-size', '28px');
  dropzone.style('border-style', 'dashed');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(handleFile, unhighlight);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(5,60);
  buttonC = createButton("Reset all");
  buttonS = createButton("Save settings");
  buttonL = createButton("Load Selected FIle");
  let col = color(255,0,0);
  buttonL.style('background-color', col);
  buttonFS = createButton("Fullscreen");
  buttonSS = createButton("Screenshot");
  buttonC.position(35, 10);
  buttonS.position(windowWidth - 118, 10);
  buttonL.position(windowWidth - 132, 40);
  buttonFS.position(windowWidth - 105, 70);
  buttonSS.position(windowWidth - 108, 100);
  buttonC.mousePressed(clearAll);
  buttonS.mousePressed(saveAll);
  buttonL.mousePressed(loadAll);
  buttonFS.mousePressed(fullScreen);
  buttonSS.mousePressed(screenShot);
//-----------------------------------------------------------------------------//
  
} // End "setup()" //
