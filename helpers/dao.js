const fs = require("fs");

const getFileContents = (srcPath, callback) => {
    fs.readFile(srcPath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
            return;
        }

        callback(data);
    });
};

const createFile = (destPath, content, callback) => {
    fs.writeFile(destPath, content, (err) => {
        if (err) {
            throw err;
            return;
        }
        callback();
    });
};

const updateFile = (path, content, callback) => {
    fs.open(path, 'a+', (err, fd) => {
        if (err) {
            throw err;
        }

        fs.write(fd, content, function(err) {
            if (err) {
                console.log('error writing file: ' + err);
            }

            fs.close(fd, function() {
                console.log('wrote the file successfully');
                callback();
            });
        });
    });
};

const getLogFiles = (fn) => {
    fs.readdir("./logs", (err, data) => {
        fn(data)
    });
}

const getVisitorFile = (fn) => {
    getFileContents("./logs/visitLog.txt", fn);
}

const getDoorSwitchLog = (fn) => {
    getFileContents("./logs/doorLog.txt", fn);
}


const logVisit = (content, fn) => {
    updateFile("./logs/visitLog.txt", (content + "\n"), fn);
}

const logDoorStateChange = (content) => {
    updateFile(__dirname + "/../logs/doorLog.txt", (content + "\n"), () => {});

}


module.exports = {
    // getFileContents,
    createFile,
    updateFile,
    getLogFiles,
    logVisit,
    logDoorStateChange,
    getVisitorFile,
    getDoorSwitchLog
}
