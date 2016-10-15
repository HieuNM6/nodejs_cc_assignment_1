#!./node_modules/.bin/babel-node

require('./helper')
const fs = require('fs').promise

async function mkdir(path) {
  await fs.mkdir(path)
    .catch((err) => {
      if (err.code === 'EEXIST') {
        console.log('Directory has existed');
      }
    });
}

process.argv[2] ? mkdir(process.argv[2].split('/')[1]) : console.log('Missing directory name')
