#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise;
const { dir, R } = require('yargs')
            .default('dir', __dirname)
            .argv
const path = require('path');

function blockPath(filePath) {
  const BLOCKS = ['node_modules'];
  for (const block of BLOCKS) {
    if (filePath.includes(block)) {
      return true;
    }
  }
  return false;
}

async function ls(dirname, paths) {
  let error = false;
  let stat = await fs.stat(dirname)
                        .catch((err) => {
                          console.log("Directory not found");
                          error = true;
                        });

  if (!error) {
    const fileNames = await fs.readdir(dirname)
                                .catch((err) => {
                                  console.log(`${dirname} is a File`);
                                  error = true
                                });
    if (!error) {
      for (const fileName of fileNames) {
        const filePath = path.join(dirname, fileName);
        stat = await fs.stat(filePath);
        if (!stat.isDirectory() || blockPath(filePath)) {
          paths.push(filePath);
        } else if (R !== undefined) {
          paths.push(filePath);
          await ls(filePath, paths);
        }
      }
    }
    return paths;
  }
}

async function main() {
  let lsOutput = await ls(dir, [])
  if (lsOutput) {
    console.log(lsOutput.join('\n'));
  }
}

main();
