#!./node_modules/.bin/babel-node

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

async function ls(dirname) {
  let error = false;
  const fileNames = await fs.readdir(dirname)
                              .catch((_) => {
                                console.log('File not found');
                                error = true;
                              });
  if (!error) {
    for (const fileName of fileNames) {
      const filePath = path.join(dirname, fileName);
      const stat = await fs.stat(filePath);
      if (!stat.isDirectory() || blockPath(filePath)) {
        console.log(filePath);
      } else if (R !== undefined) {
        await ls(filePath);
      }
    }
  }
}

async function main() {
  await ls(dir);
}

main();
