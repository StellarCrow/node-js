const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uniqid = require("uniqid");
const pathToUsers = require("../config/path").usersJson;

const Notes = require('./note');

class User {
  constructor() {}

  async createUser(name, login, password) {
    const users = await this.getUsers();
    const user = { id: uniqid(), name, login, password, notes: [] };
    users.users.push(user);
    await this.saveUsers(users);
    return user;
  }

  async deleteUser(id) {
    const users = await this.getUsers();
    const indexToDelete = users.users.findIndex(user => user.id === id);
    const userToDelete = users.users.slice(indexToDelete, indexToDelete + 1)[0];
    users.users.splice(indexToDelete, 1);
    await this.saveUsers(users);
    return userToDelete;
  }

  async getUserByLogin(login) {
    const users = await this.getUsers();
    const [user] = users.users.filter(user => user.login === login);
    return user;
  }

  async getUserById(id) {
    const users = await this.getUsers();
    const [user] = users.users.filter(user => user.id === id);
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
      throw new Error("Can't read from file.");
    }
  }

  async saveUsers(users) {
    const writeData = JSON.stringify(users);
    try {
      await writeFile(pathToUsers, writeData, "utf8");
    } catch (err) {
      throw new Error("Error while saving");
    }
  }

  async getAllNotes(id) {
    return await Notes.getUserNotes(id);
  }

  async addNote(id, note) {
    const newNote = await Notes.createNote(note, id);
    const user = await this.getUserById(id);
    user.notes.push(newNote.id);
    const users = await this.getUsers();
    const userIndex = users.users.findIndex(user => user.id === id);
    users.users.splice(userIndex, 1, user);
    await this.saveUsers(users);
    return newNote;
  }

  async deleteNote(id, note_id) {
    const deletedNote = await Notes.deleteNote(note_id);
    const users = await this.getUsers();
    const userIndex = users.users.findIndex(user => user.id === id);
    users.users[userIndex].notes.splice(deletedNote.id, 1);
    await this.saveUsers(users);
    return deletedNote;
  }
}

module.exports = new User();
