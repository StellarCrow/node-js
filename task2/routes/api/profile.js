const express = require("express");
const router = express.Router();
const UserService = require("../../services/UserService");

router.delete("/delete-user", async (req, res) => {
  const deletedUser = await UserService.deleteUser(user);
  return res
    .status(200)
    .json({ message: "User was deleted.", deleted_user: deletedUser });
});

router.get("/notes", async (req, res) => {
  const user = req.user;
  try {
    const notes = await UserService.getAllNotes(user);
    return res.status(200).json({ message: "Success", notes: notes });
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

module.exports = router;
