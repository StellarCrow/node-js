const Notes = require("../models/note");

class NoteService {
  async changeNoteState(note_id, state) {
    try {
      const note = await Notes.changeCheckedState(note_id, state);
      return note;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new NoteService();
