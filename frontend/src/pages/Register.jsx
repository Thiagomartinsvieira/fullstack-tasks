import { useState } from 'react';
import Nav from '../components/Nav';
import { registerUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      setPassword('');
      setConfirmPassword('');
      return;
    } else {
      try {
        const response = await registerUser(name, email, password);
        const token = response.user.token;
        console.log("token", token);

        if (token) {
          localStorage.setItem('token', token);
          alert('User registered successfully!');
          navigate('/dashboard');
        } else {
          throw new Error('No token returned. Registration failed.');
        }
      } catch (error) {
        alert('Error registering user: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col justify-between">
      <Nav />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md dark:border md:mt-0 xl:p-0">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
              Create a new account
            </h1>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Confirm password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label className="ml-2 text-sm font-medium text-gray-300">
                  I agree with the{' '}
                  <a href="#" className="text-blue-500 hover:underline">
                    terms and conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register new account
              </button>
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Sign in here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
