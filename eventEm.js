const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

function findPattern(files, regex) {
  const emitter = new EventEmitter();
  files.forEach(function (file) {
    fs.readFile(file, 'utf8', (err, content) => {
      if (err) return emitter.emit('error', err);
      emitter.emit('fileread', file);
      let match;
      if ((match = content.match(regex))) {
        match.forEach((elem) => emitter.emit('found', file, elem));
      }
    });
  });
  return emitter;
}

findPattern(['fileA.txt', 'fileB.json', 'fileC.js'], /hello \w+/g)
  .on('fileread', (file) => console.log(file + ' was read'))
  .on('found', (file, match) =>
    console.log('Matched "' + match + '" in file ' + file)
  )
  .on('error', (err) => console.log('Error emitted: ' + err.message));

class FindPattern extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    this.files.forEach((file) => {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('fileread', file);
        let match = null;
        if ((match = content.match(this.regex))) {
          match.forEach((elem) => this.emit('found', file, elem));
        }
      });
    });
    return this;
  }
}

const findPatternObject = new FindPattern(/hello \w+/g);

findPatternObject
  .addFile('fileA.txt')
  .addFile('fileB.json')
  .addFile('fileC.js')
  .find()
  .on('found', (file, match) =>
    console.log('Matched "' + match + '" in file ' + file)
  )
  .on('error', (err) => console.log(`Error emitted ${err.message}`));
