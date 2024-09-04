import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Nav from "../components/Nav";
import { deleteTask, getTasks } from "../services/TaskService";
import { Link } from "react-router-dom";

const Tasks = ({ token }) => {
    const [tasks, setTasks] = useState([]);

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
      const isConfirmed = window.confirm("Are you sure you want to delete this task?")
      if(isConfirmed) {
        try {
          await deleteTask(id, token);
          setTasks(tasks.filter(task => task.id !== id))
        } catch (error) {
          console.log("Error deleting task", error)
        }
      }
    }

    return (
      <div className="min-h-screen bg-gray-100 p-4">
          <Nav />
          <div className="container mx-auto mt-8">
              <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-semibold text-gray-800">My Tasks</h1>
                  <Link to="/tasks/new" 
                      
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                      Add Task
                  </Link>
              </div>
              <ul className="space-y-4">
    {tasks.map(task => (
        <li key={task.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="space-x-2">
                <Link to={`/tasks/edit/${task.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Edit</Link>
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
      </div>
  );
}

Tasks.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Tasks;
