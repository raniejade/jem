module.exports = function(context, Plugin, Logger) {
  var exec = new Plugin("exec", "Run a java command against the current JDK.");

  context.registerPlugin(exec);
};