const fs = require("fs");

const getFileContents = (srcPath, callback) => {
    fs.readFile(srcPath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        callback(data);
    });
};

const createFile = (destPath, content, callback) => {
    fs.writeFile(destPath, content, (err) => {
        if (err) {
            throw err;
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


const logVisit = (content) => {
    updateFile("./logs/visitLog.txt", (content + "\n"), () => {
        console.log("Visit logged");
    });
}


module.exports = {
    getFileContents,
    createFile,
    updateFile,
    getLogFiles,
    logVisit
}
