const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uniqid = require("uniqid");
const crypto = require("crypto");
const pathToUsers = require("../config/path").usersJson;

class User {
  constructor() {}

  async createUser(name, login, password) {
    const users = await this.getUsers();
    const user = { id: uniqid(), name, login, password, notes: [] };
    users.users.push(user);
    try {
      await this.saveUsers(users);
    } catch (err) {
      console.error(err);
      return null;
    }

    return user;
  }

  async signInUser(login, password) {
    const users = await this.getUsers();
    const [user] = users.users.filter(
      user => user.login === login && user.password === password
    );
    return user;
  }

  async isLoginExist(login) {
    const users = await this.getUsers();
    for (let user of users.users) {
      if (user.login === login) {
        return true;
      }
    }
    return false;
  }

  async getUsers() {
    try {
      return JSON.parse(await readFile(pathToUsers));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async saveUsers(users) {
    const writeData = JSON.stringify(users);
    try {
      await writeFile(pathToUsers, writeData, "utf8");
    } catch (err) {
      throw err;
    }
  }

  hashPassword(password) {
    return crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
  }
}

module.exports = new User();
