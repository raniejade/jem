var manager = require("./manager.js");

var Context = function(logger) {
  this.plugins = {};
  this.logger = logger;
  this.manager = manager;
};

Context.prototype.init = function() {
  this.manager.init();
}

Context.prototype.registerPlugin = function(plugin) {
  this.plugins[plugin.cmd] = plugin;
};

Context.prototype.execute = function(cmd, args) {
  var plugin = this.plugins[cmd];
  if (plugin != undefined) {
    plugin.exec(this.manager, args);
  } else {
    this.logger.error("Command '" + cmd + "' not found.");
  }
};

module.exports = Context;