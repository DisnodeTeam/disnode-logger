const logger = require("./index.js");

let log = new logger();

log.Error("Test", "Testing", "I am testing a thing!");
log.Success("Test", "Testing", "I am testing a thing!");
log.Warning("Test", "Testing", "I am testing a thing!");
log.Info("Test", "Testing", "I am testing a thing!");
