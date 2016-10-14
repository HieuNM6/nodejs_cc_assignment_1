#!./node_modules/.bin/babel-node

require('./helper')
const fs = require('fs').promise


async function touch() {
  await fs.writeFile(process.argv[2], '').catch(err => console.log(err));
}

process.argv[2] ? touch() : console.log('Missing file name');