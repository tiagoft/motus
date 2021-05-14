class Rect_View { // Begin class "Rect_View" //

// Constructor for the class //
//-----------------------------------------------------------------//
  constructor() {}
//-----------------------------------------------------------------//

// Show //
//-----------------------------------------------------------------//
  show(u, rectangle) {
    if(rectangle.ready == true) {
      stroke(rectangle.R, rectangle.G, rectangle.B);
    }
    else {
      stroke(255, 0, 0);
    }
    strokeWeight(1);
    if(u == 0) {
    fill(255, 70);
    }
    else {
      noFill(); 
    }
    rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  }
//-----------------------------------------------------------------//
  
// Shor RGB //
//-----------------------------------------------------------------//
  showRGB(r, g, b, rectangle) {
    stroke(255);
    strokeWeight(1);
    fill(r, g, b, 70);
    rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  }
//-----------------------------------------------------------------//

}
