import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { getTaskById, updateTaskById } from "../services/TaskService";
import { useParams } from "react-router-dom";

const EditTask = ({ token }) => {
    const { id } = useParams();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        const fetchTaskData = async () => {
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
    }, [id, token]);

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
        } catch (error) {
            console.log("An error occurred while updating the task:", error.response || error.message || error);
        }
    };

    return (
        <div>
            <Nav />
            <h2>Edit a Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Save Task</button>
            </form>
        </div>
    );
};

EditTask.propTypes = {
    token: PropTypes.string.isRequired,
};

export default EditTask;
