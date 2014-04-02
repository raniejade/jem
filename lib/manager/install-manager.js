var path = require("path-extra");
var java = require("./java.js");

var jemDir = path.homedir() + ".jem";

var internal = {
  getJemDir: function() {
    return jemDir;
  },
  getInstallDir: function() {
    return this.getJemDir() + "/versions"
  },
  getInfoFilePath: function() {
    return this.getJemDir() + "/info.json";
  },
  install: function(name, path) {

  },
  uninstall: function(name) {

  },
  exec: function(cmd, args) {

  },
  list: function() {
  }
};

module.exports = {
  install: function(name, path) {
    internal.install(name, path);
  },
  uninstall: function(name) {
    internal.uninstall(name);
  },
  exec: function(cmd, args) {
    internal.exec(cmd, args);
  },
  list: function() {
    internal.list();
  }
};