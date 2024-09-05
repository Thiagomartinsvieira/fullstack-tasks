import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const token = response.token;
      localStorage.setItem('token', token);
      console.log("token from login: ", token);
      navigate('/dashboard');
    } catch (error) {
      alert("Error to register user: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col justify-between">
      <Nav />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md dark:border md:mt-0 xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Your password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm text-gray-400">
                Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
