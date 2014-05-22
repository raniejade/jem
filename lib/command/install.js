var fs       = require("fs"),
    p        = require("path"),
    async    = require("async"),
    sprintf  = require("sprintf").sprintf;

module.exports = {
  run: function(context, args) {
    async.waterfall([
      function(n) {
        if (args.length != 2) {
          n("Invalid number of arguments.");
        } else {
          n(null, args[0], args[1]);
        }
      },
      function(name, path, n) {
        fs.exists(p.join(context.installDir, name), function(exists) {
          if (exists) {
            n(sprintf("Candidate '%s' already exists.", name));
          } else {
            n(null, name, path);
          }
        });
      },
      function(name, path, n) {
        var abs = p.resolve(process.cwd(), path);

        fs.exists(path, function(exists) {
          if (exists) {
            n(null, name, abs);
          } else {
            n(sprintf("'%s' does not exists.", path));
          }
        });
      },
      function(name, path, n) {
        // TODO: check if jdk/jre
        n(null, name, path);
      },
      function(name, path, n) {
        fs.symlink(path, p.join(context.installDir, name), function(err) {
          n(err, name, path);
        });
      }
    ], function(err, name, path) {
      if (err) {
        console.log(err);
      } else {
        context.registerCandidate({
          name: name,
          path: path
        });
      }
    });
  },
  help: function() {
    return {
      usage: "jem install <name> <path>",
      description: "Install a new candidate."
    };
  }
};
