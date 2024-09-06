const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('../src/controllers/authController');
const { registerUser, loginUser } = require('../src/services/authService');

jest.mock('../src/services/authService');

const app = express();
app.use(bodyParser.json());

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

describe('AuthController', () => {
  afterEach(() => {
    jest.clearAllMocks();  
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return status 201', async () => {
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      registerUser.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: 'User registered successfully',
        user: mockUser
      });
      expect(registerUser).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123');
    });

    it('should return status 400 if registration fails', async () => {
      registerUser.mockRejectedValue(new Error('Registration failed'));

      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Registration failed' });
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user and return a token with status 200', async () => {
      const mockToken = 'mockedToken123';
      loginUser.mockResolvedValue(mockToken);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token: mockToken });
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should return status 400 if login fails', async () => {
      loginUser.mockRejectedValue(new Error('Invalid credentials'));

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });
  });
});
