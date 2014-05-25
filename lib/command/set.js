var async   = require("async"),
    sprintf = require("sprintf").sprintf;

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
      function(candidate, n) {
        if (context.candidateExists(candidate)) {
          n(null, context.getCandidate(candidate));
        } else {
          n(sprintf("Candidate %s not found.", candidate));
        }
      }
      ], function(err, candidate) {
        if (err) {
          console.error(err);
        } else {
          context.setCurrentCandidate(candidate);
          context.persistCandidateMetadata();
        }
    });
  },
  help: function() {
    return {
      usage: "jem set <candidate>",
      description: "Set the current candidate."
    };
  }
};
