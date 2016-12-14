#! /usr/bin/env node

var c2addon = require('../lib/index');
var args = process.argv;

var command = args[2];
var src = args[3];
var dest = args[4] || ".";

console.log("c2addon " + command + " " + src + " " + dest);


if (args.length === 5 || args.length === 4) {
    switch (command) {
        case "pack":
            c2addon.pack(src, dest);
            break;
        case "extract":
            c2addon.extract(src, dest);
            break;

        case "install":
            c2addon.install(src);
            break;

        default:
            console.log("Unknow command");
            break;
    }
} else {
    console.log("Bad argument. See 'c2addon help' for help");
}