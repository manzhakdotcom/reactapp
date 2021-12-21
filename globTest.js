const glob = require('glob');

glob('src/**/*.tsx', (error, files) =>
  console.log(`All files found: ${JSON.stringify(files)}`)
).on('match', (match) => console.log(`Match found: ${match}`));
