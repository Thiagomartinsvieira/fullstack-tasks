import PropTypes from 'prop-types';
import { useState } from "react"
import Nav from "../components/Nav";
import { createTask } from "../services/TaskService";


const CreateTask = ({token}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const taskData = {title, description};
            console.log("Task Data: ", taskData);
            const newTask = await createTask(taskData, token);
            console.log("Task Creating successfully", newTask)
            setTitle('')
            setDescription('')
        } catch (error) {
            console.log("An error occurred while creating task", error)
        }
    }

  return (
    <div>
        <Nav />
        <h2>Create a new Task</h2>
        <form onSubmit={handleSubmit}>
        <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Criar Tarefa</button>
        </form>
    </div>
  )
}

CreateTask.propTypes= {
    token: PropTypes.string.isRequired,
}

export default CreateTask