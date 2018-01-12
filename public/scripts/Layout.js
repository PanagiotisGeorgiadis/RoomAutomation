var globalState =
    { logFiles : []
    , visits : []
    , doorLogs : []
    }

window.onload = () => {

    var outputContainer = document.getElementsByClassName("output")[0];

    get("/logFiles")
        .then((response) => {
            response.logs.map((filename) => {
                var logFilesContainer = document.getElementsByClassName("logfiles-container")[0];
                lineFragment(filename, logFilesContainer);
            });
            globalState.logFiles = response.logs;
            attachLogFileListeners();
        })
        .catch(() => {
            console.error("Error in /logs get request.");
        });

    post("/visitLog")
        .then((response) => {
            visits = JSON.parse(response).visits;
            visits.map((visit) => {
                // console.log(filename)
            });
            globalState.visits = visits;
        })
        .catch(() => {
            console.error("Error in /visitLog post request.");
        });

    get("/doorSwitchLog")
        .then((res) => {
            let filteredLines =
                res.lines.filter((line) => {
                    return line.length > 0
                });

            globalState.doorLogs = filteredLines;
        })
        .catch(() => {
            console.error("Error in /doorSwitchLog get request.");
        });
}
