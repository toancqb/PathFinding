
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


var game = null;

// function init() {
//     game = new Game();
//     game.init();
//     window.requestAnimationFrame(update);
// }

// function update() {    
//     game.update();    
//     window.requestAnimationFrame(update);
// }
//resources.onReady(init);
//init();

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(30);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    game = new Game();

    game.init();

    animate();
}


function animate() {

    // stop
    if (stop) {
        console.log("stop");
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here  
        game.update();      
    }
}