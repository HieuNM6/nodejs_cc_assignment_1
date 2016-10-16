#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise;
const fs2 = require('fs');
const readline = require('readline');

let argvs;

if (process.argv[2] && process.argv[3]) {
  argvs = [process.argv[2], process.argv[3]];
}

async function grep(args) {
  const stat = await fs.stat(args[1]).catch((err) => {
    console.log(`File '${args[1]}' not found`);
  });
  if (stat) {
    if (stat.isFile()) {
      readline.createInterface({
        input: fs2.createReadStream(args[1])
      })
      .on('line', (line) => {
        if (line.match(new RegExp(args[0]))) {
          console.log(line);
        }
      })
    } else {
      console.log(`${args[1]} is a directory`);
    }
  }
}

argvs ? grep(argvs) : console.log('Missing parameter')
