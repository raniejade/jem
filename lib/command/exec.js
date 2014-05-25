var sprintf = require("sprintf"),
    async   = require("async"),
    path    = require("path"),
    fs      = require("fs"),
    cp      = require("child_process");

module.exports = {
  run: function(context, args) {
    async.waterfall([
      function(n) {
        if (args.length < 1) {
          n("Invalid number of arguments.");
        } else {
          n(null, args);
        }
      },
      function(args, n) {
        var candidate = context.getCurrentCandidate();
        if (candidate) {
          n(null, args[0], candidate, args.slice(1));
        } else {
          n("No candidate currently set.");
        }
      },
      function(command, candidate, args, n) {
        var abs = path.join(candidate.path, "bin", command);
        fs.exists(abs, function(exists) {
          if (exists) {
            n(null, abs, args);
          } else {
            n(sprintf("Command %s not found.", command));
          }
        });
      }
      ], function(err, abs, args) {
        if (err) {
          console.error(err);
        } else {
          var process = cp.spawn(
            abs,
            args,
            {
              stdio: "inherit",
              detached: false
            }
          );
        }
    });
  },
  help: function() {
    return {
      usage: "jem exec <java command> [<args>, ...]",
      description: "Execute the given java command using the currently used candidate."
    };
  }
};
