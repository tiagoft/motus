class Rectangle { // Begin class "Rectangle" //

// Constructor for the class //
// -----------------------------------------------------------------------------------------------------------------------------//
  constructor(x, y, sound1, sound2, sound3, s, synth) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.area = (this.w) * (this.h);
    this.exit = 0;
    this.del = 0;
    this.text1 = 0;
    this.text2 = 0;
    this.playSN = 0;
    this.playS = 0;
    this.sB1 = 0;
    this.sB2 = 0;
    this.sB3 = 0;
    this.R = 255;
    this.G = 255;
    this.B = 255;
    this.s1 = sound1;
    this.s2 = sound2;
    this.s3 = sound3;
    this.grabbed = false;
    this.option = false;
    this.death = false;
    this.ready = false;
    this.slide = createSlider(0, 1, s, 0.01);
    this.slide.remove();
    this.Synth = synth;
    this.Synth.movW = map(this.area, 500, 583000, 110, 1);
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Set Sound 1 //
// -----------------------------------------------------------------------------------------------------------------------------//
  setS1() {
   this.playS = this.s1;
   this.ready = true;
   this.playSN = 1;
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Set Sound 2 //
// -----------------------------------------------------------------------------------------------------------------------------//
  setS2() {
   this.playS = this.s2;
   this.ready = true;
   this.playSN = 2;
  }
// -----------------------------------------------------------------------------------------------------------------------------//
  
// Set Sound 3 //
// -----------------------------------------------------------------------------------------------------------------------------//
  setS3() {
   this.playS = this.s3;
   this.ready = true;
   this.playSN = 3;
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Kill //
// -----------------------------------------------------------------------------------------------------------------------------//
  kill() {
   this.slide.remove();
   this.exit.remove();
   this.del.remove();
   this.text1.remove();
   this.text2.remove();
   this.sB1.remove();
   this.sB2.remove();
   this.sB3.remove();
   this.B = 255;
   this.death = true;
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Set Options //
// -----------------------------------------------------------------------------------------------------------------------------//
  setOption() {
    if(this.option == false) {
      this.option = true;
      this.text2 = createP('Module Volume');
      this.text2.style('color', 'white');
      this.text2.style('font-size', '14px');
      this.text1 = createP('Module Options');
      this.text1.style('color', 'white');
      this.text1.style('font-size', '14px');
      this.exit = createButton("Exit Options");
      this.del = createButton("Delete Module");
      this.sB1 = createButton("Sound 1");
      this.sB2 = createButton("Sound 2");
      this.sB3 = createButton("Sound 3");
      this.slide = createSlider(0, 1, this.slide.value(), 0.01);
      this.slide.position(0, 210);
      this.text1.position(20, 90);
      this.text2.position(20, 180);
      this.exit.position(25, 130);
      this.del.position(18, 160);
      this.sB1.position(30, 240);
      this.sB2.position(30, 270);
      this.sB3.position(30, 300);
      this.exit.mousePressed(this.setOption.bind(this));
      this.del.mousePressed(this.kill.bind(this));
      this.sB1.mousePressed(this.setS1.bind(this));
      this.sB2.mousePressed(this.setS2.bind(this));
      this.sB3.mousePressed(this.setS3.bind(this));
      this.B = 0;
    }
    else {
      this.option = false;
      this.exit.remove();
      this.del.remove();
      this.slide.remove();
      this.text1.remove();
      this.text2.remove();
      this.sB1.remove();
      this.sB2.remove();
      this.sB3.remove();
      this.B = 255;
    }
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Set Coordinetes FullScreen //
// -----------------------------------------------------------------------------------------------------------------------------//
  setCoordinetesFS(px, py) {
    this.x = px;
    this.y = py;
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Set Coordinates //
// -----------------------------------------------------------------------------------------------------------------------------//
  setCoordinetes(px, py) {
   if(this.x > ((windowWidth - liveFeedWidth)/2) && (this.x + this.w) < (liveFeedWidth + ((windowWidth - liveFeedWidth)/2))) {
     this.x = px - (this.w/2);
   }
   if(this.y > 0 && (this.y + this.h) < windowHeight) {
     this.y = py - (this.h/2);
   }
   if(this.y <= 0 && this.x <= ((windowWidth - liveFeedWidth)/2)) {
     this.y = 2;
     this.x = ((windowWidth - liveFeedWidth)/2 + 2);
   }
   else if(this.y + this.h >= windowHeight && this.x <= ((windowWidth - liveFeedWidth)/2)) {
     this.y = windowHeight - this.h - 2;
     this.x = ((windowWidth - liveFeedWidth)/2 + 2);
   }
   else if(this.y <= 0 && this.x + this.w >= (liveFeedWidth + ((windowWidth - liveFeedWidth)/2))) {
     this.y = 2;
     this.x = liveFeedWidth + ((windowWidth - liveFeedWidth)/2) - this.w - 2;
   }
   else if(this.y + this.h >= windowHeight && this.x + this.w >= (liveFeedWidth + ((windowWidth - liveFeedWidth)/2))) {
     this.y = windowHeight - this.h - 2;
     this.x = liveFeedWidth + ((windowWidth - liveFeedWidth)/2) - this.w - 2;
   }
   else if(this.y + this.h >= windowHeight) {
    this.y = windowHeight - this.h - 2; 
   }
   else if(this.y <= 0) {
     this.y = 2;
   }
   else if(this.x + this.w >= (liveFeedWidth + ((windowWidth - liveFeedWidth)/2))) {
     this.x = liveFeedWidth + ((windowWidth - liveFeedWidth)/2) - this.w - 2;
   }
   else if(this.x <= ((windowWidth - liveFeedWidth)/2)) {
    this.x = ((windowWidth - liveFeedWidth)/2 + 2); 
   }
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Hover //
// -----------------------------------------------------------------------------------------------------------------------------//
  hover(px, py) {
    let distx = abs(this.x + (this.w)/2 -px);
    let disty = abs(this.y + (this.h)/2 -py);
    if (distx < this.w/2 && disty < this.h/2) {
       return true;
    }
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Clicked //
// -----------------------------------------------------------------------------------------------------------------------------//
  clicked(px, py) {
    let distx = abs(this.x + (this.w)/2 -px);
    let disty = abs(this.y + (this.h)/2 -py);
    if (distx < this.w/2 && disty < this.h/2) {
       this.grabbed = true;
       bool = true;
    }
  }
// -----------------------------------------------------------------------------------------------------------------------------//
  
// UnClicked //
// -----------------------------------------------------------------------------------------------------------------------------//
  unClicked(px, py) {
    if (this.grabbed == true) {
       this.grabbed = false;
    }
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Double Clicked //
// -----------------------------------------------------------------------------------------------------------------------------//
  doubleClicked(px, py) {
    let distx = abs(this.x + (this.w)/2 -px);
    let disty = abs(this.y + (this.h)/2 -py);
    if (distx <= this.w/2 && disty <= this.h/2) {
       return true;
    }
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// ReEscale //
// -----------------------------------------------------------------------------------------------------------------------------//
  reEscale(x, y) {
    if(x < this.x || y < this.y || (mouseX > (windowWidth - (((windowWidth - liveFeedWidth)/2))))) {
     return; 
    }
    this.w = x - this.x;
    this.h = y - this.y;
    this.area = ((this.w) * (this.h));
  }
// -----------------------------------------------------------------------------------------------------------------------------//

// Movement Quantity //
// -----------------------------------------------------------------------------------------------------------------------------//
  movQuant() {
    if(this.grabbed == true || drag == true) {
      return;
    }
    let lFeedPixel;
    let plFeedPixel;
    let index;
    let sum = 0;
    let aux;
    let movquant;
    live_feed.loadPixels();
    preLiveFeed.loadPixels();
    let Y_init = int(map(this.y, 0, windowHeight, 0, 480));
    let Y_fin = int(map((this.y + this.h), 0, windowHeight, 0, 480));
    let X_init = int(map(this.x, (((windowWidth - liveFeedWidth)/2)), (windowWidth - (((windowWidth - liveFeedWidth)/2))), 640, 0));
    let X_fin = int(map((this.x + this.w), (((windowWidth - liveFeedWidth)/2)), (windowWidth - (((windowWidth - liveFeedWidth)/2))), 640, 0));
    for(let Y = Y_init; Y <= Y_fin; Y++) {
      aux = 0;
      sum = 0;
      for(let X = X_fin; X <= X_init; X++) {
        index = (X + Y * 640)*4;
        lFeedPixel = (live_feed.pixels[index+0] + live_feed.pixels[index+1] + live_feed.pixels[index+2])/3;
        plFeedPixel = (preLiveFeed.pixels[index+0] + preLiveFeed.pixels[index+1] + preLiveFeed.pixels[index+2])/3;
        if((lFeedPixel - plFeedPixel) > 3) {aux++;}
        sum += (lFeedPixel - plFeedPixel) * (lFeedPixel - plFeedPixel);
      }
      if(aux != 0) {movquant = sum/ /*(X_init - X_fin)*/ aux;}
    }
    movquant /= (Y_fin - Y_init);
    //movquant = sqrt(movquant);
    preLiveFeed.copy(live_feed, 0, 0, live_feed.width, live_feed.height, 0, 0, live_feed.width, live_feed.height);
    return movquant;
  }
// -----------------------------------------------------------------------------------------------------------------------------//

} // End class "Rectangle" //
