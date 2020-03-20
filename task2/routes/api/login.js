const express = require("express");
const router = express.Router();
const UserService = require("../../services/UserService");

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const { token, user } = await UserService.signIn(login, password);
  
  res.status(200).json({ token: token, user: user });
});

module.exports = router;
