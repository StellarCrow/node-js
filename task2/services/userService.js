const jwt = require("jsonwebtoken");
const secret = require('../config/auth').secret;

const Users = require("../models/user");
const CryptographyService = require('./CryptographyService');

class UserService {
  constructor() {}

  async registrateUser(newUser) {
    const { name, login, password } = newUser;
    const isLoginExist = await Users.isLoginExist(login);
    if (isLoginExist) {
      throw new Error("This login is already exist.");
    }

    const hashedPassword = CryptographyService.hashPassword(password);
    try {
      const userRecord = await Users.createUser(name, login, hashedPassword);
      return { user: userRecord };
    } catch(err) {
      throw new Error(err.message);
    }
    
  }

  async signIn(login, password) {
    const isLoginExist = await Users.isLoginExist(login);
    if (!isLoginExist) {
      throw new Error("Wrong login!");
    }
    const hashedPassword = CryptographyService.hashPassword(password);
    const user = await Users.getUserByLogin(login);

    if (user.password !== hashedPassword) {
      throw new Error("Wrong password!");
    }
    
    let jwt_token = jwt.sign(user, secret);
    return { token: jwt_token, user: user };
  }

  async getUser() {}

  async deleteUser(user) {
    const id = user.id;
    try {
      const deletedUser = await Users.deleteUser(id);
      return deletedUser;
    } catch(err) {
      throw Error(err.message);
    }
   
  }
}

module.exports = new UserService();
