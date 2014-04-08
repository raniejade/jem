module.exports = function(context, Plugin, Logger) {
  var help = new Plugin("help", "Displays helpful information.");

  context.registerPlugin(help);
};