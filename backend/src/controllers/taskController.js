const { where } = require("sequelize");
const Task = require("../models/Task");
const taskService = require("../services/taskService");

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; 
        const task = await taskService.createTask(title, description, userId);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
};

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id; 
        const tasks = await taskService.getTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to get tasks" });
    }
};

const getRecentTasks = async (req, res) => {
    try {
        const userId = req.user.id; 
        const recentTasks = await Task.findAll({
            where: {userId},
            order: [['createdAt', 'DESC']],
            limit: 3,
        });

        res.status(200).json(recentTasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to get tasks" });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to get task" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; 
        const task = await taskService.updateTask(id, updateData);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.deleteTask(id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
};

const toggleTaskCompletion = async (req, res) => {
    try {
         const taskId = req.params.id;
         console.log(`Trying to toggle completion of task with ID: ${taskId}`);
 
         const task = await Task.findByPk(taskId);
 
         if (!task) {
             return res.status(404).json({ message: "Task not found" });
         }
 
         task.completed = !task.completed;
         await task.save();
         console.log('Task updated:', task);
         return res.status(200).json(task);
 
    } catch (error) {
         console.log("Error toggling task completion", error);
         return res.status(500).json({ message: "Server error" });
    }
 }
 

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getRecentTasks,
};