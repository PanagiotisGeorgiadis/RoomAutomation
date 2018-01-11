const lineFragment = (text, parentNode) => {
    var logFile = document.createElement("div");
    var logFileText = document.createTextNode(text);

    logFile.appendChild(logFileText);
    if (parentNode) {
        parentNode.appendChild(logFile);
    }
}


const attachLogFileListeners = () => {
    var logFilesContainer = document.getElementsByClassName("logfiles-container")[0];

    for(var i = 0; i < logFilesContainer.children.length; i++) {

        logFilesContainer.children[i].addEventListener("click", function() {
            console.log("Clicked");
        });
    }
}
