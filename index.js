const pathSeparator = require("path").sep;
var express = require("express");
var app = express();
var dao = require("./helpers/dao.js");
var fs = require("fs");

// var blinkHelper = require("./helpers/LEDBlink.js");
// blinkHelper.initiate(5000);

app.use("/public", express.static(__dirname + pathSeparator + "public" + pathSeparator));


app.get("/", function(request, response, next) {
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


app.get("/logFiles", function (request, response, next) {
    dao.getLogFiles((logs) => {
        response.send({logs});
    });
});


app.post("/visitLog", (request, response) => {
    var now = new Date(Date.now());
    dao.logVisit(now, () => {
        dao.getVisitorFile((visits) => {
            response.send(
                { visits : visits.split("\n") }
            );
        });
    });
});


app.get("/doorSwitchLog", (request, response) => {
    dao.getDoorSwitchLog((lines) => {
        response.send(
            { lines : lines.split("\n") }
        );
    });
});


// setInterval(function() {
//     console.log("Hello");
// }, 1000);
// dao.getFileContents("./logs/log.txt", (contents) => {
//     console.log(contents)
// });

// setInterval(dao.backupLogs());

// dao.updateFile("./logs/log.txt", "This is some Random Content\n", (data) => {
//     dao.getFileContents("./logs/log.txt", (contents) => {
//         // console.log(contents)
//     });
// });




app.listen(3000);
