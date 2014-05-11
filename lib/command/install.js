var fs    = require("fs"),
    p     = require("path"),
    async = require("async"),
    util  = require("util");

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
            n(util.format("Candidate '%s' already exists.", name));
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
            n(util.format("'%s' does not exists.", path));
          }
        });
      },
      function(name, path, n) {
        // TODO: check if jdk/jre
        n(null, name, path);
      },
      function(name, path, n) {
        fs.symlink(path, p.join(context.installDir, name), function(err) {
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
      usage: "jem install <name> <path>",
      description: "Install a new candidate."
    };
  }
};