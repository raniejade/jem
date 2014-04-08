module.exports = function(context, Plugin, Logger) {
  var uninstall = new Plugin("uninstall", "Remove installed JDK.");

  context.registerPlugin(uninstall);
};