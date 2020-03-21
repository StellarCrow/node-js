const express = require("express");
const router = express.Router();
const UserService = require("../../services/UserService");

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const { token, user } = await UserService.signIn(login, password);
    return res.status(200).json({ token: token, user: user });
  } catch (err) {
    return res.status(400).json({ error: err.message});
  }
  
});

module.exports = router;
