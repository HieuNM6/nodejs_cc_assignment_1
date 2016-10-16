#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise;

let argvs;
if (process.argv[2] && process.argv[3]) {
  argvs = [process.argv[2], process.argv[3]];
}

async function ln(args) {
  const stat = await fs.stat(args[0]).catch((err) => {
    console.log(`'${args[0]}' no such file or directory`);
  });
  if (stat) {
    await fs.link(args[0], args[1]).catch((err) => {
      console.log('File already existed');
    });
  }
}

argvs ? ln(argvs) : console.log('Missing parameter')
