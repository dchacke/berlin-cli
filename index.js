#!/usr/bin/env node
let fs = require("fs");
let resolve = require("path").resolve
let { transpile } = require("berlin-lang/transpiler");

let [sourcePath, targetPath] = process.argv.slice(2);
let sourceCode = fs.readFileSync(sourcePath, { encoding: "utf8"});
let transpilation = transpile(sourceCode);

fs.writeFile(targetPath, transpilation, err => {
  if (err) {
    throw err;
  }

  console.log(`Transpilation successfully written to ${resolve(targetPath)}`);
});
