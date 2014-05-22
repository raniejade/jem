var fs       = require("fs"),
    p        = require("path"),
    async    = require("async"),
    sprintf  = require("sprintf").sprintf;

module.exports = {
  run: function(context, args) {
    async.waterfall([
      function(n) {
        if (args.length != 1) {
          n("Invalid number of arguments.")
        } else {
          n(null, args[0]);
        }
      },
      function(name, n) {
        var abs = p.join(context.installDir, name);
        fs.exists(abs, function(exists) {
          if (exists) {
            n(null, name, abs);
          } else {
            n(sprintf("Candidate '%s' not installed.", name));
          }
        });
      },
      function(name, path, n) {
        fs.unlink(path, function(err) {
          n(err, name, path);
        });
      }
    ], function(err, name, path) {
      if (err) {
        console.log(err);
      } else {
        context.unregisterCandidate(name);
      }
    });
  },
  help: function() {
    return {
      usage: "jem uninstall <candidate-name>",
      description: "Uninstall a candidate."
    };
  }
};
