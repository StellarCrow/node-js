const jwt = require("jsonwebtoken");
const secret = require('../config/auth').secret;

const Users = require("../models/user");

class UserService {
  constructor() {}

  async registrateUser(newUser) {
    const { name, login, password } = newUser;
    const isLoginExist = await Users.isLoginExist(login);
    if (isLoginExist) {
      throw new Error("This login is already exist.");
    }

    const hashedPassword = Users.hashPassword(password);
    const userRecord = await Users.createUser(name, login, hashedPassword);

    return { user: userRecord };
  }

  async signIn(login, password) {
    const isLoginExist = await Users.isLoginExist(login);
    if (!isLoginExist) {
      throw new Error("Wrong login!");
    }
    const hashedPassword = Users.hashPassword(password);
    const user = await Users.signInUser(login, hashedPassword);
    if (!user) {
      throw new Error("Wrong password!");
    }
    
    let jwt_token = jwt.sign(user, secret);
    return { token: jwt_token, user: user };
  }

  async getUser() {}

  async deleteUser() {}
}

module.exports = new UserService();
