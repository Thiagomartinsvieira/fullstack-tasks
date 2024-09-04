const taskService = require("../services/taskService");

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // Obtém o ID do usuário autenticado
        const task = await taskService.createTask(title, description, userId);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
};

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do usuário autenticado
        const tasks = await taskService.getTasks(userId);
        res.status(200).json(tasks);
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
        const updateData = req.body; // Dados para atualização
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

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
