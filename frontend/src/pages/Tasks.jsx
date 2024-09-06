import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Nav from "../components/Nav";
import { deleteTask, getTasks, toggleTaskCompletion } from "../services/TaskService";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');


    useEffect(() => {

        const fetchTaskData = async () => {
           
            try {
                const data = await getTasks(token);
                console.log("Fetched task data:", data);
                setTasks(data); 
            } catch (error) {
                console.log("Error fetching task data:", error);
            }
        };

        fetchTaskData();
    }, [token]);

    const handleDeleteTask = async (id) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this task?");
      if(isConfirmed) {
        try {
          await deleteTask(id, token);
          setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
          console.log("Error deleting task", error);
        }
      }
    }

    const handleToggleTaskCompletion = async (id) => {
        try {
            const updatedTask = await toggleTaskCompletion(id, token);
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
        } catch (error) {
            console.log("Error toggling task completion", error);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <Nav />
            <div className="flex-grow container mx-auto mt-8">
                <div className="flex justify-end mb-4">
                    <Link 
                        to="/tasks/new" 
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Create New Task
                    </Link>
                </div>
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li key={task.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h2 className={`text-xl font-bold ${task.completed ? 'text-green-600 line-through' : 'text-gray-800'}`}>
                                    {task.title}
                                </h2>
                                <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                                    {task.description}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    onClick={() => handleToggleTaskCompletion(task.id)} 
                                    className={`px-4 py-2 rounded-md transition duration-300 ${task.completed ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                                >
                                    {task.completed ? 'Undo' : 'Complete'}
                                </button>
                                <Link to={`/tasks/edit/${task.id}`} 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDeleteTask(task.id)} 
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

Tasks.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Tasks;