const request = require('supertest');
const express = require('express');
const taskController = require('../src/controllers/taskController');
const taskService = require('../src/services/taskService');

jest.mock('../src/services/taskService');

const app = express();
app.use(express.json());

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getTasks);
app.get('/tasks/:id', taskController.getTaskById);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);
app.patch('/tasks/:id/toggle', taskController.toggleTaskCompletion);

describe('Task Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should create a task and return it', async () => {
            const mockTask = { id: 1, title: 'Test Task', description: 'Test description', userId: 1 };
            taskService.createTask.mockResolvedValue(mockTask);

            const res = await request(app)
                .post('/tasks')
                .send({ title: 'Test Task', description: 'Test description' })
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual(mockTask);
            expect(taskService.createTask).toHaveBeenCalledWith('Test Task', 'Test description', 1);
        });

        it('should return 500 if task creation fails', async () => {
            taskService.createTask.mockRejectedValue(new Error('Failed to create task'));

            const res = await request(app)
                .post('/tasks')
                .send({ title: 'Test Task', description: 'Test description' })
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(500);
            expect(res.body.error).toBe('Failed to create task');
        });
    });

    describe('getTasks', () => {
        it('should return tasks for the user', async () => {
            const mockTasks = [{ id: 1, title: 'Test Task', description: 'Test description', userId: 1 }];
            taskService.getTasks.mockResolvedValue(mockTasks);

            const res = await request(app)
                .get('/tasks')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockTasks);
            expect(taskService.getTasks).toHaveBeenCalledWith(1);
        });

        it('should return 500 if fetching tasks fails', async () => {
            taskService.getTasks.mockRejectedValue(new Error('Failed to get tasks'));

            const res = await request(app)
                .get('/tasks')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(500);
            expect(res.body.error).toBe('Failed to get tasks');
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            const mockTask = { id: 1, title: 'Test Task', description: 'Test description' };
            taskService.getTaskById.mockResolvedValue(mockTask);

            const res = await request(app)
                .get('/tasks/1')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockTask);
            expect(taskService.getTaskById).toHaveBeenCalledWith(1);
        });

        it('should return 404 if task not found', async () => {
            taskService.getTaskById.mockResolvedValue(null);

            const res = await request(app)
                .get('/tasks/1')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('Task not found');
        });
    });

    describe('updateTask', () => {
        it('should update a task and return it', async () => {
            const mockTask = { id: 1, title: 'Updated Task', description: 'Updated description' };
            taskService.updateTask.mockResolvedValue(mockTask);

            const res = await request(app)
                .put('/tasks/1')
                .send({ title: 'Updated Task', description: 'Updated description' })
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockTask);
            expect(taskService.updateTask).toHaveBeenCalledWith(1, { title: 'Updated Task', description: 'Updated description' });
        });

        it('should return 404 if task not found', async () => {
            taskService.updateTask.mockResolvedValue(null);

            const res = await request(app)
                .put('/tasks/1')
                .send({ title: 'Updated Task', description: 'Updated description' })
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('Task not found');
        });
    });

    describe('deleteTask', () => {
        it('should delete a task and return success message', async () => {
            taskService.deleteTask.mockResolvedValue({ id: 1 });

            const res = await request(app)
                .delete('/tasks/1')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Task deleted successfully');
            expect(taskService.deleteTask).toHaveBeenCalledWith(1);
        });

        it('should return 404 if task not found', async () => {
            taskService.deleteTask.mockResolvedValue(null);

            const res = await request(app)
                .delete('/tasks/1')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('Task not found');
        });
    });

    describe('toggleTaskCompletion', () => {
        it('should toggle the completion status of a task', async () => {
            const mockTask = { id: 1, title: 'Test Task', completed: true };
            taskService.toggleTaskCompletion.mockResolvedValue(mockTask);

            const res = await request(app)
                .patch('/tasks/1/toggle')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockTask);
            expect(taskService.toggleTaskCompletion).toHaveBeenCalledWith(1, 1);
        });

        it('should return 404 if task not found', async () => {
            taskService.toggleTaskCompletion.mockRejectedValue(new Error('Task not found'));

            const res = await request(app)
                .patch('/tasks/1/toggle')
                .set('user', { id: 1 });

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe('Task not found');
        });
    });
});
