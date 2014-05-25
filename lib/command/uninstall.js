var async    = require("async"),
    sprintf  = require("sprintf").sprintf;

module.exports = {
  run: function(context, args) {
    async.waterfall([
      function(n) {
        if (args.length !== 1) {
          n("Invalid number of arguments.");
        } else {
          n(null, args[0]);
        }
      },
      function(name, n) {
        if (!context.candidateExists(name)) {
          n(sprintf("Candidate '%s' does not exists.", name));
        } else {
          n(null, name);
        }
      }
    ], function(err, name) {
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
