#!/usr/bin/env node
let fs = require("fs");
let resolve = require("path").resolve
let { transpile } = require("berlin-lang/transpiler");
let { lex } = require("berlin-lang/lexer");
let core = require("berlin-lang/core");
let vm = require("vm");
let prompt = require("prompt-sync")({
  sigint: true,
  history: require('prompt-sync-history')()
});

let setTitle = title => {
  process.stdout.write(
    String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
  );
};

// The command was simply "berlin". We want to run
// the repl.
if (process.argv.length <= 2) {
  setTitle("Berlin REPL");

  const context = core;
  vm.createContext(context);

  console.log("\nWelcome to Berlin. Type exit to leave.\n")

  let command = "";

  while (true) {
    let input = prompt(command.length ? "... " : "berlin > ");

    if (input === "exit" && !command.length) {
      prompt.history.save();
      break;
    }

    command += input;

    if (!lex(command).unclosedDelimiters.length) {
      try {
        let result = vm.runInContext(transpile(command), context);
        console.log(result);
      } catch (e) {
        console.log("Exception:", e);
      } finally {
        command = "";
      }
    }
  }
// The command was invoked with a source and target path.
// We want to transpile.
} else {
  setTitle("Transpiling Berlin...");

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
