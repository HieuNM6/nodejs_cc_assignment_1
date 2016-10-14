#!./node_modules/.bin/babel-node

require('./helper')

async function echo() {
  if (process.argv[2] !== undefined) {
    console.log(process.argv.splice(2).join(' '));
  } else {
    console.log('\n');
  }
}

echo()
