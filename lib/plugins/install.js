module.exports = function(context, Plugin, Logger) {
  var install = new Plugin("install", "Install a new JDK.");

  context.registerPlugin(install);
};