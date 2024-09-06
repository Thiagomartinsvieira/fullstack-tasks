const User = require('../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../src/services/authService');

jest.mock('../src/models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should register a new user and return a token', async () => {
            const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' };
            User.create.mockResolvedValue(mockUser);
            bcrypt.hash.mockResolvedValue('hashedpassword');
            jwt.sign.mockReturnValue('mockToken');

            const result = await registerUser('John Doe', 'john@example.com', 'password123');

            expect(User.create).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' });
            expect(result.user).toEqual(mockUser);
            expect(result.token).toBe('mockToken');
        });
    });

    describe('loginUser', () => {
        it('should return a token when credentials are valid', async () => {
            const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' };
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockToken');

            const result = await loginUser('john@example.com', 'password123');

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
            expect(result).toBe('mockToken');
        });

        it('should throw an error when credentials are invalid', async () => {
            User.findOne.mockResolvedValue(null);
            
            await expect(loginUser('wrong@example.com', 'password123')).rejects.toThrow('Invalid credentials');
        });
    });
});
