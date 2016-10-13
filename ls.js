#!./node_modules/.bin/babel-node

require('./helper')
let fs = require('fs').promise;

function readFileByDir(dir) {
  fs.readdir(dir).then( (files) => {
    console.log(files.join(" "));
  }, (errors) => {
    console.log(errors);
  })
}

function readFileByDirRecursive() {

}

async function ls() {
    if (process.argv[2] === undefined) {
      await readFileByDir(__dirname);
    } else {
      await readFileByDir(process.argv[2]);
    }
}

ls()
