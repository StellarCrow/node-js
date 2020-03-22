const express = require("express");
const router = express.Router();
const UserService = require("../../services/UserService");

router.get("/", async (req, res) => {
  const user = req.user;
  try {
    const userProfile = await UserService.getUser(user.id);
    return res.status(200).json({ user: userProfile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await UserService.deleteUser(id);
    return res.status(200).json({ message: "User was deleted." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/notes", async (req, res) => {
  const user = req.user;
  try {
    const notes = await UserService.getAllNotes(user);
    const notes_count = notes.length;
    return res
      .status(200)
      .json({ message: "Success", notes_count: notes_count, notes: notes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/add-note", async (req, res) => {
  const note = req.body.note;
  const user = req.user;
  try {
    const newNote = await UserService.addNote(user, note);
    return res.status(201).json({ message: "Created note", note: newNote });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-note/:id", async (req, res) => {
  const note_id = req.params.id;
  const user = req.user;
  try {
    await UserService.deleteNote(user, note_id);
    return res.status(200).json({ message: "Deleted note" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
