import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        try {
          const decoded = jwtDecode(token);
          setUserDetails({ name: decoded.name || 'Anonymous User', email: decoded.email || 'No Email' });
        } catch (error) {
          console.error("Error decoding token:", error);
          navigate('/login');
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Nav />
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-10">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Profile</h1>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            
            <div className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Profile Information</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={userDetails.name}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={userDetails.email}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            </div>

            <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Additional Info</h2>
              <p className="text-white">Here you can add more details about the user. (coming soon)</p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-10">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
