const Task = require('../models/Task');

const createTask = async (title, description, userId) => {
  const task = new Task({ title, description, userId });
  return task.save();
};

const getTasks = async (userId) => {
  return Task.find({ userId });
};

const getTaskById = async (id) => {
  return Task.findById(id); 
};

const updateTask = async (id, updateData) => {
  return Task.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTask = async (id) => {
  return Task.findByIdAndDelete(id);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
