module.exports = {
  normalizeExePath: function(exe) {
    return process.platform == "win32" ? exe + ".exe" : exe;
  }
};