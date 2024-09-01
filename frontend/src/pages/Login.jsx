import { useState } from 'react';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const token = await loginUser(email, password);
    localStorage.setItem('token', token);
    console.log("token: ", token)
    navigate('/dashboard')
  } catch (error) {
    alert("Error to regusrer user: " + error)
  }
}

  return (
    <div>
      <Nav />
      <form onSubmit={handleLogin} 
      className="max-w-sm mx-auto bg-gray-900 my-10 px-10 py-10 rounded-xl">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-white">
            Your email
          </label>
          <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 
          dark:text-white">
            Your password
          </label>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
