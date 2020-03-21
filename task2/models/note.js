const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uniqid = require("uniqid");
const pathToNotes = require("../config/path").notesJson;

class Note {
  constructor() {}

  async getNotesFromFile() {
    try {
      return JSON.parse(await readFile(pathToNotes));
    } catch (err) {
      throw new Error("Can't read from file.");
    }
  }

  async saveNotesToFile(notes) {
    const writeData = JSON.stringify(notes);
    try {
      await writeFile(pathToNotes, writeData, "utf8");
    } catch (err) {
      throw new Error("Error while saving");
    }
  }

  async createNote(note, user_id) {
    const notes = await this.getNotesFromFile();
    const newNote = {
        user_id: user_id,
        text: note.text || "",
        checked: note.checked || false,
        id: uniqid()
    }
    notes.notes.push(newNote);
    this.saveNotesToFile(notes);
    return newNote;
  }

  async getUserNotes(id) {
    const notes = await this.getNotesFromFile();
    return notes.notes.filter(note => note.user_id === id);
  }
}

module.exports = new Note();
