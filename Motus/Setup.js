function setup() { // Begin "setup()" //

// Inicialize live feed from webcam and create background //  
//-----------------------------------------------------------------------------//
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  live_feed = createCapture(VIDEO);
  live_feed.size(640, 480);
  live_feed.hide();
  preLiveFeed = createImage(640, 480, RGB);
  background(0);
//-----------------------------------------------------------------------------//

// Inicialize first blank object //
//-----------------------------------------------------------------------------//
  let z = new Rectangle(0, 0, 0, 0, 0);
  objects.push(z);
//-----------------------------------------------------------------------------//


// Create general control buttons //
//-----------------------------------------------------------------------------//
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(5,60);
  button = createButton("Reset all");
  button.position(35, 10);
  button.mousePressed(clearAll);
//-----------------------------------------------------------------------------//
  
} // End "setup()" //
