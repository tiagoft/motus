class PH_Synth { // Begin class "PH_Synth" //

// Constructor for the class //
//-----------------------------------------------------------------//
  constructor() {
    this.yAnte = 0;
    this.filterW = 0;
    this.movW = 0;
  }
//-----------------------------------------------------------------//

// Synthesize //
//-----------------------------------------------------------------//
  synth(object, mov, slider, bool) {
    let speed;
    if(mov >= this.yAnte) {
       this.filterW = 0.85;
    }
    else {
       this.filterW = 0.15; 
    }
    this.yAnte = (this.filterW * mov) + ((1 - this.filterW) * this.yAnte);
    if(bool == true) { 
      speed = map(this.yAnte, 0, this.movW, 0, 2);
      speed = constrain(speed, 0.01, 2);
      object.playS.rate(speed);
      object.playS.amp(object.slide.value() * slider.value());
    }
    else {
      object.playS.play();
      speed = map(this.yAnte, 0, this.movW, 0, 2);
      speed = constrain(speed, 0.01, 2);
      object.playS.rate(speed);
      object.playS.amp(object.slide.value() * slider.value());
    }
  }
//-----------------------------------------------------------------//

} // End class "PH_Synth" //
