var Gpio = require("onoff").Gpio;
var dao = require("./dao.js");

// const blinkLED = (LED) => {
//     if (LED.readSync() === 0)
//         LED.writeSync(1);
//     else
//         LED.writeSync(0);
// }
//
//
// const endBlink = (interval, LED) => {
//     clearInterval(interval);
//     LED.writeSync(0);
//     LED.unexport();
// }


const initiate = (duration) => {
    var LED = new Gpio(4, "out");
    var doorSwitch = new Gpio(17, "in", "press");


    // var blinkInterval = setInterval(() => {
    //     blinkLED(LED)
    // }, 250);

    // setTimeout(() => {
    //     endBlink(blinkInterval, LED)
    // }, duration);
    var prevValue = 0;

    doorSwitch.watch((err,value) => {
        if (err)
            console.log("Error in doorSwitch");

	if (value === 0 && prevValue !== value) {
            console.log("Door Opened!");
	    dao.logDoorStateChange("Door Opened! " + new Date(Date.now()) + "\n");
	} else {
            //console.log("Door Closed!");
	    dao.logDoorStateChange("Door Closed! " + new Date(Date.now()) + "\n");
	}
    });

    process.on("SIGINT", doorSwitch.unexport);
}


module.exports = {
    initiate
}
