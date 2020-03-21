const express = require("express");
const router = express.Router();

const NoteService = require("../../services/NoteService");

router.post("/check", async (req, res) => {
  const note_id = req.body.note;
  const note_state = req.body.checked;
  try {
    const changedNote = await NoteService.changeNoteState(note_id, note_state);
    return res.status(200).json({ message: "Changed note state", note: changedNote });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
