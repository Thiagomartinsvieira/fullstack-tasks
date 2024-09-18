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


export const updateName = async (name) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
        `${API_URL}profile`, 
        {name},
        {headers: {
            Authorization: `Bearer ${token}`
        }}
    );
    localStorage.setItem("token", response.data.token)
    return response.data;
  } catch (error) {
    console.log("Error updating name:", error.message);
    throw error
  }
}

export const logoutUser = () => {
    localStorage.removeItem('token')
}
