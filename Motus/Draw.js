function draw() { // Begin "draw()" //
// Render background with camera feed //
//-----------------------------------------------------------------------------//
  background(0);
  noStroke();
  fill(50);
  rect(0, 0, 140, 90);
  scale(-1.0, 1.0);
  image(live_feed, (liveFeedWidth-windowWidth)/2-liveFeedWidth, 0, liveFeedWidth, windowHeight);
  scale(-1.0, 1.0);
  fill(255, 255, 255, 255);
  stroke(255);
  strokeWeight(1);
  text('Master Volume', 30, 55);
//---------------------------------------------------//

// Render objects created on screen //
//-----------------------------------------------------------------------------//
  for (let a = 0; a < objects.length; a++) {
    let speed;
    let quant = objects[a].movQuant();
    let movColor = map(quant, 0, 2.5, 0, 255);
    if(objects[a].getDeath() == true) {
     objects.splice(a, 1); 
     break;
    }
    if(objects[a].getGrabbed() == true) {
      objects[a].setCoordinetes(mouseX, mouseY); 
    }
    if(objects[a].hover(mouseX, mouseY) == true) {
      objects[a].show(0);
    }
    else {
      objects[a].show(1);
    }
    if(quant > 0.3 && a != 0 && objects[a].ready == true) {
      objects[a].showRGB(movColor, 0, 0);
      if(objects[a].playS.isPlaying() == true) {
        speed = map(quant, 0.1, 2.5, 0, 2);
        speed = constrain(speed, 0.01, 4);
        objects[a].playS.rate(speed);
        objects[a].playS.amp(objects[a].getSlide().value() * slider.value());
      }
      else {
        objects[a].playS.play();
        speed = map(quant, 0.1, 2.5, 0, 2);
        speed = constrain(speed, 0.01, 4);
        objects[a].playS.rate(speed);
        objects[a].playS.amp(objects[a].getSlide().value() * slider.value());
      }
    }
  }
//-----------------------------------------------------------------------------//

// Reescale last added object while mouse is pressed
//-----------------------------------------------------------------------------//
  if(drag == true) {
    objects[objects.length - 1].reEscale(mouseX, mouseY); 
  }
//-----------------------------------------------------------------------------//
} // End "draw()" //
