// movement.js
// Detecting movement in particular parts of the video for musical purposes
// Idea: map amount of movement in a part of the screen to soundscape parameters

// http://html5doctor.com/video-canvas-magic/

// Global variables
var rawMoves = new Array(4);

// Parameters
var decay = 0.9; // For the filter
var th = 40; // Differences below this are going to be ignored! document.getElementById("noise_control").value;

// Context variables
var valTop = { Value: 0 };
var valBottom = { Value: 0 };
var valLeft = { Value: 0 };
var valRight = { Value: 0 };

// Things to do when document is loaded.
window.addEventListener("DOMContentLoaded", function() {
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');

    var cw,ch;




		// Variables for storing previous frames
		var prevTop = new Array (640*100);
		var diffTop = new Array (640*100);
		var sumTop = 0.0;

		// Bottom variables
		var prevBottom = new Array (640*100);
		var diffBottom = new Array (640*100);
		var sumBottom = 0.0;

		// Left variables
		var prevLeft = new Array (320*280);
		var diffLeft = new Array (320*280);
		var sumLeft = 0.0;

		// Right varibales
		var prevRight = new Array (320*280);
		var diffRight = new Array (320*280);
		var sumRight = 0.0;

    v.addEventListener('play', function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;

        movement(v,context,backcontext,640,100,0,0,diffTop,prevTop,sumTop,"moveTop", valTop);
        movement(v,context,backcontext,640,100,0,380,diffBottom,prevBottom,sumBottom,"moveBottom", valBottom);
        movement(v,context,backcontext,320,280,0,100,diffLeft,prevLeft,sumLeft,"moveLeft", valLeft);
        movement(v,context,backcontext,320,280,320,100,diffRight,prevRight,sumRight,"moveRight", valRight);


    },false);

	// ---- STREAM WEBCAM TO VIDEO ELEMENT
  videoObj = { "video": true };
  errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			v.src = stream;
			v.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			v.src = window.webkitURL.createObjectURL(stream);
			v.play();
		}, errBack);
	}
}, false);

function movement(v,c,bc,w,h, top,left, difference, previousFrame,diffSum,outId,outVar) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,640,480);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(top,left,w,h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale

		var j = 0;
		var diffTemp = 0.0;

    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3*r+4*g+b)>>>3;
				// Compute differences
				difference[j] = Math.abs(previousFrame[j]-brightness);
				if (difference[j] > th)
						diffTemp = diffTemp + difference[j];
				else
						difference[j] = 0;

				previousFrame[j] = brightness;
				j = j + 1;

				// Output differences
        data[i] = difference[j];
        data[i+1] = diffSum * 30;
        data[i+2] = previousFrame[j];
    }
		diffTemp = diffTemp / data.length;

		if (diffTemp > diffSum) {
				diffSum = diffTemp;}
		else {
				diffSum = (decay * diffSum);}

		document.getElementById(outId).value = diffSum;
		outVar.Value = diffSum*3;

    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,top,left);

    // Start over!
    setTimeout(function(){ movement(v,c,bc,w,h,top,left,difference, previousFrame,diffSum,outId,outVar); }, 10);
}

// Specialist functions - to use with 

function play_piece() {
		MIDI.setVolume(0, 127);
		bass_part();
		harmony_sequencer();
		melody_sequencer(0, 10);
		treble_sequencer(0);
}

function treble_sequencer(last_note) {
		var allowed_notes = new Array(78, 79, 81, 82, 84, 85, 87, 88, 90, 91, 93, 94, 96, 97, 99, 100);
		var this_note = last_note + Math.floor(Math.random()*3) - 1;
		if (this_note < 0)
				this_note = 1;
		if (this_note >= allowed_notes.length)
				this_note = allowed_notes.length - 1;

		var new_note = allowed_notes[this_note];

		var velocity = Math.min(100,Math.floor(70*valTop.Value)); 

		MIDI.noteOn(0, new_note, velocity, 0);
		MIDI.noteOff(0, new_note, 0.5);

		setTimeout(function(){ treble_sequencer(this_note); }, 75)
}

function normalize(input, minIn, maxIn, minOut, maxOut) {
		// Normalizes a range:
		// Input is from minIn to maxIn and return is from
		// minOut to maxOut
		return minOut+(input-minIn)*(maxOut-minOut)/(maxIn-minIn);
}


function bass_part() {
		var allowed_notes = new Array(34, 36, 37, 39, 40, 42, 43, 45, 46, 48, 49);
		var new_note = allowed_notes[Math.floor(Math.random()*allowed_notes.length)];
 		var velocity = Math.min(100,20-(new_note)+Math.floor(70*Math.sqrt(valBottom.Value))); // root notes will play harder!
		MIDI.noteOn(0, new_note, velocity, 0);
		MIDI.noteOff(0, new_note, 2);
    setTimeout(bass_part, 750-(50*valBottom.Value));
}

// Sequencing algorithms - see docs/insights.txt for more info
window.onload = function () {
		// Bass part
		MIDI.loadPlugin({
				soundfontUrl: "./soundfont/",
				instrument: "acoustic_grand_piano",
				callback: play_piece
	});
};
function harmony_sequencer() {
		var allowed_notes = new Array(48, 49, 51, 52, 54, 55, 57, 58, 60, 61, 63, 64, 66, 67, 69);

		for (var i = 0; i < 3; i++) {
				MIDI.noteOn(0, new_note, velocity, 0);
				MIDI.noteOff(0, new_note, 3);
				var new_note = allowed_notes[Math.floor(Math.random()*allowed_notes.length)];
 				var velocity = Math.min(100,20-(new_note)+Math.floor(70*Math.sqrt(valLeft.Value))); // root notes will play harder!
		}
    setTimeout(harmony_sequencer, 1000-(100*valLeft.Value)+Math.floor(100*Math.random()));
}

function melody_sequencer(last_note, last_velocity) {
		var allowed_notes = new Array(55, 57, 58, 60, 61, 63, 64, 66, 67, 69, 70, 72, 73, 75, 76, 78, 79, 81, 82);
		var this_note = last_note + Math.floor(Math.random()*3) - 1;
		if (this_note < 0)
				this_note = 1;
		if (this_note >= allowed_notes.length)
				this_note = allowed_notes.length - 1;

		var new_note = allowed_notes[this_note];
		var duration = Math.random()*250+125-(30*valRight.Value);
		var velocity = Math.min(100,20-(new_note)+Math.floor(70*Math.sqrt(valRight.Value))); 


		MIDI.noteOn(0, new_note, velocity, 0);
		MIDI.noteOff(0, new_note, duration/1000.0);
		
		setTimeout(function(){ melody_sequencer(this_note, velocity); }, duration)
}
