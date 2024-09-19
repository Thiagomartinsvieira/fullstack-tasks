import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { logoutUser, updateUser } from '../services/AuthService';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateProfile = () => {
    updateUser(userDetails.name, userDetails.email)
      .then(() => {
        console.log("User updated with Successfuly")
      })
      .catch((error) => {
        console.log("Error to update user:", error);
      });
  }

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
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Profile</h1>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Profile Information</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <button
              onClick={updateProfile}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
              > 
                Save Changes
              </button>
            </div>

            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
              <p className="text-white">More details coming soon!</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => { logoutUser(); navigate("/") }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
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
