function doubleClicked() { // Begin "doubleClicked()" //

// Remove double clicked objects //
// -----------------------------------------------------------------------------------------------------------------------------//
  for (let j = 0; j < objects.length; j++) {
    if(objects[j].doubleClicked(mouseX, mouseY) == true) {
       objects[j].setOption();
    }
  } 
// -----------------------------------------------------------------------------------------------------------------------------//
} // End "doubleClicked()" //

function mousePressed() { // Begin "mousePressed()" //
  bool = false;
  drag = false;
  
// Create new objects //
// -----------------------------------------------------------------------------------------------------------------------------//
  for (let n = 0; n < objects.length; n++) {
    objects[n].clicked(mouseX, mouseY);
    if(bool == true) {
      break; 
    }
  }
  if(bool == false && mouseX > (windowWidth - liveFeedWidth)/2 && mouseX < windowWidth - ((windowWidth - liveFeedWidth)/2)) {
     let sy = new PH_Synth();
     let b = new Rectangle(mouseX, mouseY, sound1, sound2, sound3, 1, sy);
     objects.push(b);
     drag = true;
  }
// -----------------------------------------------------------------------------------------------------------------------------//

} // End "mousePressed()" //

function mouseReleased() {  // Begin "mouseReleased()" //
  for (let g = 0; g < objects.length; g++) {
   objects[g].unClicked(mouseX, mouseY);
  }
  if(drag == true) {
   drag = false; 
  }
} // End "mouseReleased()" //
