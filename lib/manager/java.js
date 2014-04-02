var fs = require("fs");
var exec = require("child_process").exec;
var utils = require("./utils.js")

var JavaEnv = function(name, version, dir, type) {
  // unique name
  this.name = name;
  // java version
  this.version = version;
  // location
  this.dir = dir;
  // type (jdk or jre)
  this.type = type;
};

function getJavaExePath(bin) {
  return utils.normalizeExePath(bin + "/java");
}

function getJavacExePath(bin) {
  return utils.normalizeExePath(bin + "/javac");
}

module.exports = {
  JavaEnv: JavaEnv,
  getBinDir: function(path) {
    return path + "/bin";
  },
  isValid: function(path) {
    return fs.existsSync(getJavaExePath(this.getBinDir(path)));
  },
  checkType: function(path) {
    if (this.isValid(path)) {
      return fs.existsSync(getJavacExePath(this.getBinDir(path))) ? "jdk" : "jre";
    }
    return "unknown";
  },
  checkVersion: function(path, callback) {
    var cmd = getJavaExePath(this.getBinDir(path)) + " -version";

    exec(cmd, {timeout: 3000}, function(error, stdout, stderr) {
      var version = null;

      if (error == null || error.code == 0) {
        var pattern = /java version "(.+)"/;
        var match = pattern.exec(stdout.toString());

        if (match == null) {
          match = pattern.exec(stderr.toString());
        }

        if (match != null && match.length == 2) {
          version = match[1];
        }
      }
      callback(version);
    });
  }
};