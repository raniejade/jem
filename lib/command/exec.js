module.exports = {
  run: function(context, args) {

  },
  help: function() {
    return {
      usage: "jem exec <java command> [<args>, ...]",
      description: "Execute the given java command using the currently used candidate."
    };
  }
};