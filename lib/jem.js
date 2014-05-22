#! /usr/bin/env node

var Context   = require("./context.js");

var context = new Context();

context.init(function (err) {
  if (err) {
    console.error(err);
  } else {
    var args = process.argv;

    if (args.length == 2) {
      console.log("Usage: jem <command> [args]");
    } else {
      context.exec(args[2], args.slice(3));
    }
  }
});
