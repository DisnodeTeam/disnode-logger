const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const os = require('os');
const moment = require('moment');

class Logger {
    constructor(log = true) {
        this.log = log;
    }

    Success(name, info, message) {
        let logmsg = "Success [" + this.getTimeData() + "][" + name + "][" + info + "] " + message;
        let msg = chalk.bold.green("[" + this.getTimeData() + "][" + name + "][" + info + "] ") + message;

        console.log(msg);
        if (this.log) {
            saveLog(logmsg);
        }
    }

    Warning(name, info, message) {
        let logmsg = "Warning [" + this.getTimeData() + "][" + name + "][" + info + "] " + message;
        let msg = chalk.bold.yellow("[" + this.getTimeData() + "][" + name + "][" + info + "] ") + message;

        console.log(msg);
        if (this.log) {
            saveLog(logmsg);
        }
    }

    Error(name, info, message) {
        let logmsg = "Error [" + this.getTimeData() + "][" + name + "][" + info + "] " + message;
        let msg = chalk.bold.red("[" + this.getTimeData() + "][" + name + "][" + info + "] ") + message;

        console.log(msg);
        if (this.log) {
            saveLog(logmsg);
        }
    }

    Info(name, info, message) {
        let logmsg = "Info [" + this.getTimeData() + "][" + name + "][" + info + "] " + message;
        let msg = chalk.bold.blue("[" + this.getTimeData() + "][" + name + "][" + info + "] ") + message;

        console.log(msg);
        if (this.log) {
            saveLog(logmsg);
        }
    }
    getTimeData() {
        return moment().format("MMM DD YYYY hh:mm:ss:SSSS A");
    }
    setLog(log) {
        this.log = log;
    }
}

function saveLog(logstring) {
    var time = new Date();
    var file = "./logs/" + (time.getMonth() + 1) + "-" + time.getDate() + "-" + time.getFullYear() + "-LOG.txt";
    fs.stat(file, function (err, stats) {
        if (err) {
            ensureDirectoryExistence(file);
            fs.writeFile(file, logstring + os.EOL, function (err) {
                if (err) throw err;
            });
        } else {
            ensureDirectoryExistence(file);
            fs.appendFile(file, logstring + os.EOL, function (err) {
                if (err) throw err;
            });
        }
    })
}

function saveLog(logstring) {
    var time = new Date();
    var file = "./logs/" + (time.getMonth() + 1) + "-" + time.getDate() + "-" + time.getFullYear() + "-LOG.txt";
    fs.stat(file, function (err, stats) {
        if (err) {
            ensureDirectoryExistence(file);
            fs.writeFile(file, logstring + os.EOL, function (err) {
                if (err) throw err;
            });
        } else {
            ensureDirectoryExistence(file);
            fs.appendFile(file, logstring + os.EOL, function (err) {
                if (err) throw err;
            });
        }
    })
}
function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

module.exports = Logger;