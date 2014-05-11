var fs    = require("fs"),
    p     = require("path"),
    async = require("async"),
    util  = require("util");

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
            n(null, abs);
          } else {
            n(util.format("Candidate '%s' not installed.", name));
          }
        });
      },
      function(path, n) {
        fs.unlink(path, function(err) {
          n(err);
        });
      }
    ], function(err) {
      if (err) {
        console.log(err);
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