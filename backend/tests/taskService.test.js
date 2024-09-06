const { createTask, getTasks, getTaskById, updateTask, deleteTask, toggleTaskCompletion } = require('../src/services/taskService');
const Task = require('../src/models/Task');

jest.mock('../src/models/Task');

describe('Task Service', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            const mockTask = { id: 1, title: 'Test Task', description: 'Description', userId: 1 };
            Task.create.mockResolvedValue(mockTask);

            const result = await createTask('Test Task', 'Description', 1);

            expect(Task.create).toHaveBeenCalledWith({ title: 'Test Task', description: 'Description', userId: 1 });
            expect(result).toEqual(mockTask);
        });
    });

    describe('getTasks', () => {
        it('should get all tasks for a user', async () => {
            const mockTasks = [{ id: 1, title: 'Test Task', description: 'Description', userId: 1 }];
            Task.findAll.mockResolvedValue(mockTasks);

            const result = await getTasks(1);

            expect(Task.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
            expect(result).toEqual(mockTasks);
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            const mockTask = { id: 1, title: 'Test Task', description: 'Description' };
            Task.findByPk.mockResolvedValue(mockTask);

            const result = await getTaskById(1);

            expect(Task.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockTask);
        });
    });

    describe('updateTask', () => {
        it('should update a task', async () => {
            const mockTask = { id: 1, title: 'Old Title', update: jest.fn().mockResolvedValue({ id: 1, title: 'New Title' }) };
            Task.findByPk.mockResolvedValue(mockTask);

            const result = await updateTask(1, { title: 'New Title' });

            expect(Task.findByPk).toHaveBeenCalledWith(1);
            expect(mockTask.update).toHaveBeenCalledWith({ title: 'New Title' });
            expect(result).toEqual({ id: 1, title: 'New Title' });
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            const mockTask = { id: 1, destroy: jest.fn().mockResolvedValue() };
            Task.findByPk.mockResolvedValue(mockTask);

            const result = await deleteTask(1);

            expect(Task.findByPk).toHaveBeenCalledWith(1);
            expect(mockTask.destroy).toHaveBeenCalled();
            expect(result).toEqual(mockTask);
        });
    });

    describe('toggleTaskCompletion', () => {
        it('should toggle the completion status of a task', async () => {
            const mockTask = { id: 1, completed: false, save: jest.fn().mockResolvedValue() };
            Task.findOne.mockResolvedValue(mockTask);

            const result = await toggleTaskCompletion(1, 1);

            expect(mockTask.completed).toBe(true);
            expect(mockTask.save).toHaveBeenCalled();
            expect(result).toEqual(mockTask);
        });
    });
});