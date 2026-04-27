
import User from "../models/user.js";

function getUsers(filter) {
  return User.find(filter);
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  const userToAdd = new User(user);
  return userToAdd.save();
}

function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export { getUsers, findUserById, addUser, deleteUserById };