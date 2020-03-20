const express = require("express");
const router = express.Router();
const UserService = require("../../services/UserService");

router.post("/registration", async (req, res) => {
  const newUser = {
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  };

  const { user } = await UserService.registrateUser(newUser);
  if (user) {
    return res.status(201).json({ user: user });
  } 
});

module.exports = router;
