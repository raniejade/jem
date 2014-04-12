var path  = require("path"),
    fs    = require("fs");

var USER_HOME = process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"];
var JEM_DIR = path.join(USER_HOME, ".jem");
var INSTALL_PATH = path.join(JEM_DIR, "candidates");
var CURRENT_CANDIDATE_PATH = path.join(JEM_DIR, "current");

function ManagerException(message) {
  this.message = message;
}

function getCandidatePath(name) {
  return path.join(INSTALL_PATH, name);
}

module.exports = {
  init: function() {
    if (!fs.existsSync(JEM_DIR)) {
      fs.mkdirSync(JEM_DIR);
    }

    if (!fs.existsSync(INSTALL_PATH)) {
      fs.mkdirSync(INSTALL_PATH);
    }
  },
  install: function(name, dir) {
    if (!fs.existsSync(getCandidatePath(name))) {
      if (fs.existsSync(dir)) {
        fs.symlinkSync(dir, path.join(INSTALL_PATH, name));
      } else {
        throw new ManagerException("'" + dir + "' does not exists");
      }
    } else {
      throw new ManagerException("A candidate named '" + name + "' exists.");
    }
  },
  uninstall: function(name) {
    if (!fs.existsSync(getCandidatePath(name))) {
      fs.unlinkSync(getCandidatePath(name));
      // TODO: if it is the current candidate, point to another
    } else {
      throw new ManagerException("No candidate exists with the name '" + name + "'.");
    }
  },
  getJavaHome: function() {
    return path.join(CURRENT_CANDIDATE_PATH, "bin");
  }
};