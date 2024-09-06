import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { createTask } from "../services/TaskService";

const CreateTask = ({ token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [navigate, token])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const taskData = { title, description };
            console.log("Task Data: ", taskData);
            const newTask = await createTask(taskData, token);
            console.log("Task created successfully", newTask);
            navigate('/my-tasks');
            
        } catch (error) {
            console.log("An error occurred while creating task", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Nav />
            <div className="container mx-auto mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Create a New Task</h2>
                    <Link
                        to="/my-tasks"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        My Tasks
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate('/my-tasks')}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CreateTask.propTypes = {
    token: PropTypes.string.isRequired,
};

export default CreateTask;