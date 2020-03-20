const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const pathToUsersJson = require("../config/path").usersJson;

class User {
  async createUser(name, login, password) {
    const users = await this.getUsers();
    const isLoginExist = this.isLoginExist(login, users);
    if(isLoginExist) {
        return null;
    }

    const user = { name, login, password, notes: [] };
    users.users.push(user);
    
    try {
        await this.saveUsers(users);
    } catch (err) {
        return null;
    }
    
    return user;
  }

  async getUsers() {
    try {
      return JSON.parse(await readFile(pathToUsersJson));
    } catch (err) {
      console.error(error);
      return null;
    }
  }

  async saveUsers(users) {
    const writeData = JSON.stringify(users);
    try {
      await writeFile(path, writeData, "utf8");
    } catch (err) {
      throw err;
    }
  }

  isLoginExist(login, users) {
    return users.users.filter(user => user.login === login)
  }
}


module.exports = User;