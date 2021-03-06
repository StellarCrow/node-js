const jwt = require("jsonwebtoken");
const secret = require("../config/auth").secret;

const Users = require("../models/user");
const CryptographyService = require("./CryptographyService");

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
    } catch (err) {
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

  async getUser(id) {
    return await Users.getUserById(id);
  }

  async deleteUser(id) {
    try {
      await Users.deleteUser(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllNotes(user) {
    const id = user.id;
    try {
      const notes = await Users.getAllNotes(id);
      return notes;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async addNote(user, note) {
    const id = user.id;
    const newNote = await Users.addNote(id, note);
    return newNote;
  }

  async deleteNote(user, note_id) {
    const id = user.id;
    await Users.deleteNote(id, note_id);
  }
}

module.exports = new UserService();
