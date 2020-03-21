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
    const {users} = await this.getUsers();
    const user = { id: uniqid(), name, login, password, notes: [] };
    users.push(user);
    await this.saveUsers({users: users});
    return user;
  }

  async deleteUser(id) {
    const {users} = await this.getUsers();
    const indexToDelete = users.findIndex(user => user.id === id);
    console.log(indexToDelete);
    
    await Notes.deleteAllUserNotes(id);
    users.splice(indexToDelete, 1);
    await this.saveUsers({users: users});
  }

  async getUserByLogin(login) {
    const {users} = await this.getUsers();
    const [user] = users.filter(user => user.login === login);
    return user;
  }

  async getUserById(id) {
    const {users} = await this.getUsers();
    const [user] = users.filter(user => user.id === id);
    return user;
  }

  async isLoginExist(login) {
    const {users} = await this.getUsers();
    return users.some((user) => user.login === login);
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
    const {users} = await this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    users.splice(userIndex, 1, user);
    await this.saveUsers({users: users});
    return newNote;
  }

  async deleteNote(id, note_id) {
    await Notes.deleteNote(note_id);
    const {users} = await this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    users[userIndex].notes.splice(note_id, 1);
    await this.saveUsers({users: users});
  }
}

module.exports = new User();
