// Program global variables //
var myCanvas;// ----------------------->
var live_feed;// ----------------------> Variable for live camera feed //
var liveFeedWidth = 1000;// -----------> Variable for camera display width //
var objects = [];// -------------------> Vector of objects created on screen for movement capture //
var bool;// ---------------------------> Variable for mouse pressed on objects identification //
var drag;// ---------------------------> Variable for object dragged by the mouse identification //
var preLiveFeed;// --------------------> Variable for live camera feed delayed by 1 tik //
var sound1;// -------------------------> Variable for sound sample //
var sound2;// -------------------------> Variable for sound sample //
var sound3;// -------------------------> Variable for sound sample //
var slider;// -------------------------> Variable for general slider //
var buttonC;// ------------------------> Variable for general button //
var buttonS;// ------------------------> Variable for save button //
var buttonSS; // ---------------------->
var buttonL;// ------------------------> Variable for load button //
var jsonObj;// ------------------------> Variable for loaded external json file //
var jsonReady = false;// --------------> Variable for identification of conclude loading process of input file //
var saveLoad;// -----------------------> Class object of Rectangle Save-Load controller //
var rectView;// -----------------------> Class object of Rectangle View controller //
var buttonFS;// -----------------------> Variable for fullscreen button //
var Fullscreen = false;// -------------> Variable for fullscreen detection //
var oldHeight = window.innerHeight;// -> Variable for storing the default Height of the canvas //
var oldWidth = window.innerWidth;// --->
var proportionH;// ---------------------> Variable for proportion between fullscreen and non-fullscreen // 
var proportionW;// ---------------------> Variable for proportion between fullscreen and non-fullscreen // 
var dropzone;// ------------------------>
var mVolume;// ------------------------->
var loading = false;
