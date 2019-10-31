const logger = require("./index.js");
const static = require("./index.js").static;
let log = new logger();

log.Error("Test", "Testing", "I am testing a thing!");
log.Success("Test", "Testing", "I am testing a thing!");
log.Warning("Test", "Testing", "I am testing a thing!");
log.Info("Test", "Testing", "I am testing a thing!");

static.Error("Test", "Testing", "I am testing a thing!");
static.Success("Test", "Testing", "I am testing a thing!");
static.Warning("Test", "Testing", "I am testing a thing!");
static.Info("Test", "Testing", "I am testing a thing!");