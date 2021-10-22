const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter(function (note){
    //     return note.title === title;
    // })

    //const duplicateNotes = notes.filter((note) => note.title === title);

    const duplicateNote = notes.find((note) => note.title === title);

    debugger

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen.black("New note added"));
    } else {
        console.log(chalk.bgRed.black("Title taken"));
    }

    saveNotes(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen.black("Note removed"));
        saveNotes(notesToKeep);}
    else{console.log(chalk.bgRed.black("No note found"));}
}

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse("Your Notes"));

    notes.forEach((note) => {
        console.log(note.title + ": ")
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const match = notes.find((note) => note.title === title);

    if(match){
        console.log(chalk.inverse(match.title));
        console.log(match.body);
    }
    else{
        console.log(chalk.bgRed.black("Not found"));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
