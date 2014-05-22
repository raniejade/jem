var async = require("async"),
    fs    = require("fs"),
    p     = require("path"),
    sprintf  = require("sprintf").sprintf;

module.exports = {
  run: function(context, args) {
    if (context.candidates.installed.length > 0) {
      console.log(sprintf("%-15s %-20s", "name", "path"));
      async.each(context.candidates.installed, function(candidate, n) {
        console.log(sprintf("%-15s %-20s", candidate.name, candidate.path));
        n();
      }, function(err) {});
    } else {
      console.log("No candidates installed.");
    }
  },
  help: function() {
    return {
      usage: "jem list",
      description: "List installed candidates."
    };
  }
};
