var async = require("async"),
    fs    = require("fs"),
    util  = require("util");

module.exports = {
  run: function(context, args) {
    async.waterfall([
      function(n) {
        if (args.length != 1) {
          n("Invalid number of arguments.");
        } else {
          n(null, args[0], context.resolveCmdScript(args[0]));
        }
      },
      function(cmd, script, n) {
        fs.exists(script, function(exists) {
          if (exists) {
            var help = require(script).help();
            n(null, help);
          } else {
            n(util.format("Unknown command %s.", cmd));
          }
        });
      }
    ], function(err, help) {
      if (err) {
        console.log(err);
      } else {
        console.log("Description:");
        console.log("\t%s", help.description);
        console.log("Usage:");
        console.log("\t%s", help.usage);
      }
    });
  },
  help: function() {
    return {
      usage: "jem help <command>",
      description: "Display helpful hints for a particular command."
    };
  }
};