var Gpio = require("onoff").Gpio;
var dao = require("./dao.js");
//var mailer = require("./mailer.js");

/*
const blinkLED = (LED) => {
    if (LED.readSync() === 0)
        LED.writeSync(1);
    else
        LED.writeSync(0);
}
*/
/*
const endBlink = (interval, LED) => {
    clearInterval(interval);
    LED.writeSync(0);
    LED.unexport();
}
*/

const getDoorState = (stateValue) => {
    if (stateValue === 0) {
	return "CLOSED";
    } else if (stateValue === 1) {
	return "OPENED";
    } else {
	return "UNKNOWN";
    }
}

var prevDoorState = "CLOSED";

const startWatching = (targetSwitch) => {
    return targetSwitch.watch((err, value) => {
	if (err)
	    console.log("Error in doorSwitch: " + err);

	var doorState = getDoorState(value);
	if (doorState === "CLOSED") {
	    console.log("The Door is CLOSED!");
	}
       /* if (value === 0) {
	    console.log("The Door is CLOSED!");
	    dao.logDoorStateChange("Door Closed at " + new Date(Date.now()) + "\n");
	} else {
	    console.log("The Door is OPENED!");
	    dao.logDoorStateChange("Door Opened at " + new Date(Date.now()) + "\n");
	}*/
    });
}

const initiate = (duration) => {
    //var LED = new Gpio(17, "out");
    var doorSwitch = new Gpio(17, "in", "falling");

    /*
    var blinkInterval = setInterval(() => {
        blinkLED(LED)
    }, 250);

    setTimeout(() => {
        endBlink(blinkInterval, LED)
    }, duration);
    */
    //let doorState = 0;

    /*var doorWatch = doorSwitch.watch((err,value) => {
        if (err)
            console.log("Error in doorSwitch");

	//if (value !== doorState) { 
	    if (value === 1) {
	        console.log("Door Closed!");
            }
	    if (value === 0) {
                console.log("Door Closed!");
	        dao.logDoorStateChange("Door Closed at " + new Date(Date.now()) + "\n");
	        //mailer.sendMail("Door Closed at " + new Date(Date.now()));
	    } else {
                console.log("Door Opened!");
	        dao.logDoorStateChange("Door Opened at " + new Date(Date.now()) + "\n"); 
	        //mailer.sendMail("Door Opened at " + new Date(Date.now()));
	    }
	    //doorState = value;
	//}
	doorSwitch.unwatch();
    });*/
    var doorWatch = startWatching(doorSwitch);
    
    process.on("SIGINT", doorSwitch.unwatch);
}


module.exports = {
    initiate
}
