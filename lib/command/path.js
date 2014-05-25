module.exports = {
  run: function(context, args) {
    var path = "";
    var current = context.getCurrentCandidate();

    if (current) {
      path = current.path;
    }

    console.info(path);
  },
  help: function() {
    return {
      usage: "jem path",
      description: "Prints the path to the current candidate."
    };
  }
};
