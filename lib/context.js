var path      = require("path"),
    pathExtra = require("path-extra"),
    fs        = require("fs");

var Context = function() {
  this.homeDir = pathExtra.homedir();
  this.jemDir = path.join(this.homeDir, ".jem");
  this.installDir = path.join(this.jemDir, "candidates");
};

Context.prototype.init = function() {
  var $this = this;
  fs.exists(this.jemDir, function(exists) {
    if (!exists) {
      fs.mkdir($this.jemDir, 0755, function(err) {
        if (err) {
          console.error(err);
        }
      });
    }
  });
};

Context.prototype.exec = function(cmd, args) {
  var script = this.resolveCmdScript(cmd);
  var $this = this;

  fs.exists(script, function(exists) {
    if (exists) {
      require(script).run($this, args);

    } else {
      console.log("unknown command: %s", cmd);
    }
  });
};

Context.prototype.resolveCmdScript = function(cmd) {
  return path.join(__dirname, "command", cmd + ".js");
};

module.exports = Context;