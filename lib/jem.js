#! /usr/bin/env node

var Context   = require("./context.js");

var context = new Context();

context.init();

var args = process.argv;

if (args.length == 2) {
  console.log("Usage: jem <command> [args]");
} else {
  context.exec(args[2], args.slice(3));
}