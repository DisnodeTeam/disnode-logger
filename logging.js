const colors = require('colors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const StackLogging = require('@google-cloud/logging')
const StackError = require('@google-cloud/error-reporting').ErrorReporting;
const stackErrors = new StackError();

var opts = {}

exports.EnableStackLogging = function(projectId, logname) {
  opts.stackLogging = new Logging({
    projectId: projectId,
  });

  opts.stackLogName = logname;
  opts.enableStackLog = true;
}

function TimeCode() {
  var time = new Date();
  var finalString = "31";
  finalString = (time.getMonth() + 1) + "/" + time.getDate() + "/" + time.getFullYear();
  finalString += " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  return finalString;
}

exports.Info = function(caller, event, data, log = true) {
  var msg = "[" + colors.cyan(" INFO  ") + "] " + colors.magenta(TimeCode()) +
    " [" +
    colors.grey(caller) + " " +
    colors.cyan("(" + event + ")") +
    "] " + data;
  var logmsg = "[ INFO  ] " + TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if (log) {
    saveLog(logmsg);
  }

  if (opts.enableStackLog) {
    const log = opts.stackLogging.log(opts.stackLogName);
    const text = logmsg;
    const metadata = {resource: {type: 'disnode'}};
    const entry = log.entry(metadata, text);
    log.write(entry).catch console.error);
  }
};

exports.Error = function(caller, event, data, log = true) {
  var msg = "[" + colors.red(" ERROR ") + "] " + colors.magenta(TimeCode()) +
    " [" +
    colors.grey(caller) + " " +
    colors.cyan("(" + event + ")") +
    "] " + colors.red(data);
  var logmsg = "[" + " ERROR " + "] " + TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if (log) {
    saveLog(logmsg);
  }

  if (opts.enableStackLog) {
    const log = opts.stackLogging.log(opts.stackLogName);
    const text = logmsg;
    const metadata = {};
    const entry = log.entry(metadata, text);
    log.error(entry).catch console.error);
  }
};

exports.Warning = function(caller, event, data, log = true) {
  var msg = "[" + colors.yellow("WARNING") + "] " + colors.magenta(TimeCode()) +
    " [" +
    colors.grey(caller) + " " +
    colors.cyan("(" + event + ")") +
    "] " + colors.yellow(data);
  var logmsg = "[" + "WARNING" + "] " + TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if (log) {
    saveLog(logmsg);
  }

  if (opts.enableStackLog) {
    const log = opts.stackLogging.log(opts.stackLogName);
    const text = logmsg;
    const metadata = {};
    const entry = log.entry(metadata, text);
    log.warning(entry).catch console.error);
  }

};

exports.Success = function(caller, event, data, log = true) {
  var msg = "[" + colors.green("SUCCESS") + "] " + colors.magenta(TimeCode()) + " [" + colors.grey(caller) + " " + colors.cyan("(" + event + ")") + "] " + colors.green(data);
  var logmsg = "[" + "SUCCESS" + "] " + TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if (log) {
    saveLog(logmsg);
  }

  if (opts.enableStackLog) {
    const log = opts.stackLogging.log(opts.stackLogName);
    const text = logmsg;
    const metadata = {};
    const entry = log.entry(metadata, text);
    log.write(entry).catch console.error);
  }
};




function saveLog(logstring) {
  var time = new Date();
  var file = "./logs/" + time.getMonth() + "-" + time.getDate() + "-" + time.getFullYear() + "-LOG.txt";
  fs.stat(file, function(err, stats) {
    if (err) {
      ensureDirectoryExistence(file);
      fs.writeFile(file, logstring + os.EOL, function(err) {
        if (err) throw err;
      });
    } else {
      ensureDirectoryExistence(file);
      fs.appendFile(file, logstring + os.EOL, function(err) {
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
