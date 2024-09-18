import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { getTaskById, updateTaskById } from "../services/TaskService";

const EditTask = () => {
    const { id } = useParams();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchTaskData = async () => {
            if(!token) {
                navigate('/login')
            }
            try {
                const data = await getTaskById(id, token);
                console.log("Fetched task data:", data);
                setTaskData({
                    title: data.title,
                    description: data.description,
                });
            } catch (error) {
                console.log("Error fetching task data:", error);
            }
        };

        fetchTaskData();
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Sending updated task data:", taskData);
            const updatedTask = await updateTaskById(id, taskData, token);
            console.log("Task updated successfully:", updatedTask);
            navigate('/my-tasks');
        } catch (error) {
            console.log("An error occurred while updating the task:", error.response || error.message || error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Nav />
            <div className="container mx-auto mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Edit Task</h2>
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
                            name="title"
                            value={taskData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={taskData.description}
                            onChange={handleChange}
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
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EditTask.propTypes = {
    token: PropTypes.string.isRequired,
};

export default EditTask;
