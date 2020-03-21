const express = require("express");
const router = express.Router();
const UserService = require("../../services/UserService");

router.post("/registration", async (req, res) => {
  const newUser = {
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  };

  try {
    const { user } = await UserService.registrateUser(newUser);
    return res.status(201).json({ user: user });
  }
  catch(err) {
      return res.status(400).json({error: err.message });
  }
});

module.exports = router;
