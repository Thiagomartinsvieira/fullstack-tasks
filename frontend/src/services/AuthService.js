import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

const API_URL = `${apiUrl}/api/auth/`;

export const registerUser = async (name, email, password) => {
    const response = await axios.post(`${API_URL}register`, {name, email, password });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, {email, password})
    return response.data;
};