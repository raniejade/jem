#! /usr/bin/env node

var Context   = require("./context.js"),
    Plugin    = require("./plugin.js"),
    winston   = require("winston"),
    fs        = require("fs"),
    path      = require("path");


var console = new winston.transports.Console({level: process.env["JEM_VERBOSE"] == 1 ? "debug" : "info"});

var logger = new (winston.Logger)({
  transports: [console]
});

var context = new Context();

function loadPlugin(plugin) {
  require(plugin)(context, Plugin, logger);
}

// load builtin plugins
logger.verbose("Loading builtin plugins.");
fs.readdirSync(path.join(__dirname, "plugins")).forEach(function(plugin) {
  logger.verbose("Loading plugin: %s", plugin);
  try {
    loadPlugin("./plugins/" + plugin);
  } catch(err) {
    logger.error("Failed to load plugin '%s': %s", plugin, err.message);
  }
});