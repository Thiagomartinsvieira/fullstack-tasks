import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

export const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}register`, { email, password });
    return response.data;
};