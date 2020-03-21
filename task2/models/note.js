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

  async deleteNote(id) {
    const notes = await this.getNotesFromFile();
    const noteIndex = notes.notes.findIndex(note => note.id === id);
    const noteToDelete = notes.notes.slice(noteIndex, noteIndex + 1)[0];
    notes.notes.splice(noteIndex, 1);
    await this.saveNotesToFile(notes);
    return noteToDelete;
  }

  async getUserNotes(id) {
    const notes = await this.getNotesFromFile();
    return notes.notes.filter(note => note.user_id === id);
  }

  async changeCheckedState(id, state) {
    const notes = await this.getNotesFromFile();
    const noteIndex = notes.notes.findIndex(note => note.id === id);
    notes.notes[noteIndex].checked = state;
    const changedNote = notes.notes.slice(noteIndex, noteIndex + 1)[0];
    await this.saveNotesToFile(notes);
    return changedNote;
  }

  async changeText(id, text) {
    const notes = await this.getNotesFromFile();
    const noteIndex = notes.notes.findIndex(note => note.id === id);
    notes.notes[noteIndex].text = text;
    const changedNote = notes.notes.slice(noteIndex, noteIndex + 1)[0];
    await this.saveNotesToFile(notes);
    return changedNote;
  }
}

module.exports = new Note();
