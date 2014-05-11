var async = require("async"),
    fs    = require("fs"),
    p     = require("path");

module.exports = {
  run: function(context, args) {
    fs.readdir(context.installDir, function(err, candidates) {
      if (err) {
        console.log(err);
      } else {
        async.each(candidates, function(candidate, n) {
          fs.readlink(p.join(context.installDir, candidate), function(err, link) {
            if (err) {
              console.log("Failed to read link for %s", candidate);
            } else {
              console.log("%s\t>>\t%s", candidate, link);
            }
          });
        }, function(err) {});
      }
    });
  },
  help: function() {
    return {
      usage: "jem list",
      description: "List installed candidates."
    };
  }
};