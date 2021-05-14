function draw() { // Begin "draw()" //
// Render background with camera feed //
//-----------------------------------------------------------------------------//
  background(0);
  noStroke();
  fill(50);
  rect(0, 0, 140, 90);
  scale(-1.0, 1.0);
  image(live_feed, (liveFeedWidth-windowWidth)/2-liveFeedWidth, 0, liveFeedWidth, window.innerHeight);
  scale(-1.0, 1.0);
//---------------------------------------------------//

// Render objects created on screen //
//-----------------------------------------------------------------------------//
  for (let a = 0; a < objects.length; a++) {
    let quant = objects[a].movQuant();
    let movColor = map(quant, 0, 2.5, 0, 255);
    if((a != 0) && (objects[a].area < 900) && (drag == false) && (loading == false)) {
      objects.splice(a, 1); 
      break;
    }
    if(objects[a].death == true) {
     objects.splice(a, 1); 
     break;
    }
    if(objects[a].grabbed == true) {
      objects[a].setCoordinetes(mouseX, mouseY); 
    }
    if(objects[a].hover(mouseX, mouseY) == true) {
      rectView.show(0, objects[a]);
    }
    else {
      rectView.show(1, objects[a]);
    }
    if(quant > 1.0 && a != 0 && objects[a].ready == true) {
      rectView.showRGB(movColor, 0, 0, objects[a]);
      objects[a].Synth.synth(objects[a], quant, slider, objects[a].playS.isPlaying());
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
