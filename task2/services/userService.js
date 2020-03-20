const User = require("../models/user");

class UserService {
  constructor() {}

  async registrateUser(newUser) {
    const { name, login, password } = newUser;
    const userRecord = await User.createUser(name, login, password);
    return { user: userRecord };
  }

  async getUser() {

  }

  async deleteUser() {}
}


module.exports = UserService;