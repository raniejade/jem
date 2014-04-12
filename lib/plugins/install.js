module.exports = function(context, Plugin, Logger) {
  var install = new Plugin("install", "Install a new JDK.");

  install.exec = function(manager, args) {
    if (args instanceof Array && args.length == 2) {
      try {
        manager.install(args[0], args[1]);
        return true;
      } catch (e) {
        Logger.error(e.message);
      }
    } else {
      Logger.error("Invalid number of arguments.")
    }


    return false;
  };

  install.help = function() {
    return {
      usage: "jem install <name> <absolute/path/to/jdk/or/jre>",
      description: "Install a new candidate."
    };
  };

  context.registerPlugin(install);
};