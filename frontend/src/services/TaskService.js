import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(`${API_URL}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error creating task:", error);
        throw error;
    }
};

export const getTasks = async (token) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching tasks:", error);
        throw error;
    }
};

export const getTaskById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching task by ID:", error);
        throw error;
    }
};

export const updateTaskById = async (id, taskData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error deleting task:", error);
        throw error;
    }
};

export const toggleTaskCompletion = async(id, token) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/toggle-completion`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error toggling task completetion:", error)
        throw error;
    }
}

