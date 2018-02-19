const colors = require('colors');
const fs = require('fs');
const path = require('path');
var probe = require('pmx').probe();
var os = require('os');

var pmx = require('pmx').init({
  http          : false, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : false, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : false, // Network monitoring at the application level
  ports         : false  // Shows which ports your app is listening on (default: false)
});

function TimeCode(){
  var time = new Date();
  var finalString = "31";
  finalString = (time.getMonth() + 1 ) + "/" + time.getDate() + "/"+time.getFullYear();
  finalString += " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  return finalString;
}

exports.Info = function (caller, event, data, log = true) {
  var msg = "["+colors.cyan(" INFO  ")+"] "+colors.magenta(TimeCode()) +
    " [" +
    colors.grey(caller) + " " +
    colors.cyan("(" + event + ")")  +
    "] " + data;
  var logmsg = "[ INFO  ] "+ TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if(log){
    saveLog(logmsg);
  }
};

exports.Error= function (caller, event, data, log = true) {
  var msg = "["+colors.red(" ERROR ")+"] "+colors.magenta(TimeCode()) +
    " [" +
    colors.grey(caller) + " " +
    colors.cyan("(" + event + ")")  +
    "] " + colors.red(data);
  var logmsg = "["+" ERROR "+"] "+ TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  pmx.notify(msg);
  if(log){
    saveLog(logmsg);
  }
};

exports.Warning= function (caller, event, data, log = true) {
  var msg = "["+colors.yellow("WARNING")+"] "+colors.magenta(TimeCode()) +
    " [" +
    colors.grey(caller) + " " +
    colors.cyan("(" + event + ")")  +
    "] " + colors.yellow(data);
  var logmsg = "["+"WARNING"+"] "+ TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if(log){
    saveLog(logmsg);
  }
};

exports.Success= function (caller, event, data, log = true) {
  var msg = "["+colors.green("SUCCESS")+"] "+ colors.magenta(TimeCode()) + " [" + colors.grey(caller) + " " + colors.cyan("(" + event + ")") + "] " + colors.green(data);
  var logmsg = "["+"SUCCESS"+"] "+ TimeCode() + " [" + caller + " " + "(" + event + ")" + "] " + data;
  console.log(msg);
  if(log){
    saveLog(logmsg);
  }
};

exports.AddRemoteVal = function(name, val){
  var metric = probe.metric({
    name    : name,
    value   : val
  });
}


function saveLog(logstring){
  var time = new Date();
  var file = "./logs/" + time.getMonth() + "-" + time.getDate() + "-" + time.getFullYear() + "-LOG.txt";
  fs.stat(file,function(err,stats) {
    if(err){
      ensureDirectoryExistence(file);
      fs.writeFile(file,logstring + os.EOL,function(err){
        if(err)throw err;
      });
    }else {
      ensureDirectoryExistence(file);
      fs.appendFile(file,logstring + os.EOL,function(err){
        if(err)throw err;
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
