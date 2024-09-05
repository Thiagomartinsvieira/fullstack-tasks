const { where } = require('sequelize');
const Task = require('../models/Task');

const createTask = async (title, description, userId) => {
    const task = await Task.create({ title, description, userId });
    return task;
};

const getTasks = async (userId) => {
    return Task.findAll({ where: { userId } });
};

const getTaskById = async (id) => {
    return Task.findByPk(id);
};

const updateTask = async (id, updateData) => {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return task.update(updateData);
};

const deleteTask = async (id) => {
    const task = await Task.findByPk(id);
    if (!task) return null;
    await task.destroy();
    return task;
};

const toggleTaskCompletion = async (id, userId) => {
    const task = await Task.findOne({where: {id: id, userId}});
    if(!task) {
        throw new Error("Task not found")
    }

    task.completed = !task.completed;
    await task.save();
    return task
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskCompletion
};
