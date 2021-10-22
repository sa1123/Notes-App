//const validator = require('validator')
const yargs = require("yargs");
const notes = require("./notes.js");

// const msg = getNotes()
// console.log(msg)

// console.log(chalk.red.bold.inverse('Error'))

// console.log(validator.isEmail('sahil@abc.com'))

// console.log(yargs.argv)
// const command = process.argv[2]

// if  (command === 'add'){
//     console.log('Adding notes')
// } else if (command === 'remove'){
//     console.log('Removing notes')
// }

// Add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Remove command
yargs.command({
  command: "remove",
  describe: "Remove a new note",
  builder:{
      title:{
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// List command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  },
});

// Read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder:{
    title:{
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
