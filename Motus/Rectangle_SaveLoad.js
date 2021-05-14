class Rect_SL { // Begin class "Rect_SL" //

// Constructor for the class //
//-----------------------------------------------------------------//
  constructor() {}
//-----------------------------------------------------------------//

// Save JSON //
//-----------------------------------------------------------------//
  saveJSON(json, rect) {
    json.x = rect.x;
    json.y = rect.y;
    json.w = rect.w;
    json.h = rect.h;
    json.area = rect.area;
    json.R = rect.R;
    json.G = rect.G;
    json.B = rect.B;
    json.slide = rect.slide.value();
    json.playSN = rect.playSN;
  }
//-----------------------------------------------------------------//

// Load JSON //
//-----------------------------------------------------------------//
  loadJSON(json, rect, n) {
     rect.w = json.objects[n].w;
     rect.h = json.objects[n].h;
     rect.area = json.objects[n].area;
     rect.R = json.objects[n].R;
     rect.G = json.objects[n].G;
     rect.B = json.objects[n].B;
     rect.playSN = json.objects[n].playSN;
     if(json.objects[n].playSN == 1) {
       rect.setS1();
     }
     else if(jsonObj.objects[n].playSN == 2) {
       rect.setS2();
     }
     else if(jsonObj.objects[n].playSN == 3){
       rect.setS3(); 
     }
  } 
//-----------------------------------------------------------------//

}
