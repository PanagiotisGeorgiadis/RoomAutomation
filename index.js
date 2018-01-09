var express = require("express");
var app = express();

app.get("/", function(request, response) {
    var options = {
        root: __dirname,
	headers: {
	    "x-timestamp": Date.now(),
	    "x-sent": true
	}
    }

    var filename = "index.html";
    response.sendFile(filename, options, function(err) {
        if(err) {
	    next(err);
	} else {
	    console.log("Sent: " + filename);
	}
    });
});

app.listen(3000);
