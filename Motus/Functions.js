function clearAll() { // Begin "clearAll()" //
// Clear all objects a create a new blank one //
    objects = [];
    let f = new Rectangle(0, 0, 0, 0, 0);
    objects.push(f);
} // End "clearAll()" //

function preload() { // Begin "preload()" //
// Preload all sounds to be used //
  sound1 = loadSound('assets/s1.mp3');
  sound2 = loadSound('assets/s2.mp3');
  sound3 = loadSound('assets/s3.mp3');
} // End "preload()" //
