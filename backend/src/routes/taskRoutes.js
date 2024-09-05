const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);
router.patch('/:id/toggle-completion', authMiddleware, taskController.toggleTaskCompletion);

module.exports = router;
