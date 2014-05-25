var path      = require("path"),
    pathExtra = require("path-extra"),
    fs        = require("fs"),
    sprintf   = require("sprintf").sprintf,
    os        = require("os");

var Context = function() {
  this.homeDir = pathExtra.homedir();
  this.jemDir = path.join(this.homeDir, ".jem");
  this.installDir = path.join(this.jemDir, "candidates");
  this.candidatesMetadata = path.join(this.jemDir, "candidates.json");
  this.sourceFile = path.join(this.jemDir, "source");
};

Context.prototype = {};

Context.prototype.init = function(cb) {
  var $this = this;
  fs.exists(this.jemDir, function(exists) {
    if (!exists) {
      fs.mkdir($this.jemDir, 0755, function(err) {
        if (err) {
          cb(err);
        } else {
          $this.candidates = {
            current: null,
            installed: []
          };
          // create candidates.json
          fs.writeFile($this.candidatesMetadata, JSON.stringify($this.candidates), function(err) {
            if (err) {
              cb(err);
            } else {
              cb(null);
            }
          });
        }
      });
    } else {
      // parse candidates file
      fs.readFile($this.candidatesMetadata, function(err, data) {
        if (err) {
          cb(err);
        } else {
          try {
            var value = JSON.parse(data);
            if (value.current !== undefined && (value.installed && value.installed instanceof Array)) {
              $this.candidates = value;
              cb(null);
            } else {
              cb("Invalid candidates.json!");
            }
          } catch (e) {
            cb(e);
          }
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

Context.prototype.registerCandidate = function(candidate) {
  this.candidates.installed.push(candidate);

  // if no current
  if (this.hasNoCurrentCandidate()) {
    console.log(sprintf("Setting '%s' as current candidate.", candidate.name));
    this.setCurrentCandidate(candidate);
  }

  this.persistCandidateMetadata();
};

Context.prototype.unregisterCandidate = function(name) {
  this.candidates.installed = this.candidates.installed.filter(function(candidate) {
    return candidate.name !== name;
  });

  if (this.isCurrentCandidate(name)) {
    if (this.candidates.installed.length > 0) {
      console.log(sprintf("Setting '%s' as current candidate.", this.candidates.installed[0].name));
      this.setCurrentCandidate(this.candidates.installed[0]);
    } else {
      console.log("Uninstalling last candidate.");
      this.candidates.current = null;
    }
  }

  this.persistCandidateMetadata();
};

Context.prototype.persistCandidateMetadata = function() {
  var $this = this;
  fs.writeFile(this.candidatesMetadata, JSON.stringify(this.candidates), function(err) {
    if (err) {
      console.error(err);
    } else {
      var candidate = $this.getCurrentCandidate();
      var source = sprintf('export PATH="$PATH:%s/bin"%s', candidate.path, os.EOL);

      if (candidate) {
        fs.writeFile($this.sourceFile, source, function(err) {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  });
};

Context.prototype.candidateExists = function(name) {
  for (var i in this.candidates.installed) {
    if (this.candidates.installed[i].name === name) {
      return true;
    }
  }
  return false;
};

Context.prototype.getCandidate = function(name) {
  for (var i in this.candidates.installed) {
    if (this.candidates.installed[i].name === name) {
      return this.candidates.installed[i];
    }
  }
  return null;
};

Context.prototype.getCurrentCandidate = function() {
  return this.candidates.current;
};

Context.prototype.isCurrentCandidate = function(candidate) {
  return this.candidates.current.name === candidate;
};

Context.prototype.setCurrentCandidate = function(candidate) {
  this.candidates.current = candidate;
};

Context.prototype.hasNoCurrentCandidate = function() {
  return this.candidates.current === null;
};

Context.prototype.resolveCmdScript = function(cmd) {
  return path.join(__dirname, "command", cmd + ".js");
};

module.exports = Context;
