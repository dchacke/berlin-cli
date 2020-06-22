#!/usr/bin/env node
let fs = require("fs");
let resolve = require("path").resolve
let { transpile } = require("berlin-lang/transpiler");
let core = require("berlin-lang/core");
let vm = require("vm");
let prompt = require("prompt-sync")({
  sigint: true,
  history: require('prompt-sync-history')()
});

// The command was simply "berlin". We want to run
// the repl.
if (process.argv.length <= 2) {
  const context = core;
  vm.createContext(context);

  console.log("\nWelcome to Berlin. Type exit to leave.\n")

  while (true) {
    let input = prompt("berlin > ");

    if (input === "exit") {
      prompt.history.save();
      break;
    }

    try {
      let result = vm.runInContext(transpile(input), context);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
// The command was invoked with a source and target path.
// We want to transpile.
} else {
  let [sourcePath, targetPath] = process.argv.slice(2);
  let sourceCode = fs.readFileSync(sourcePath, { encoding: "utf8" });
  let transpilation = transpile(sourceCode);

  fs.writeFile(targetPath, transpilation, err => {
    if (err) {
      throw err;
    }

    console.log(`Transpilation successfully written to ${resolve(targetPath)}`);
  });
}
