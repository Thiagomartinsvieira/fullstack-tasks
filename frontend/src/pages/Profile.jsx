import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { deleteUser, getProfile, logoutUser, updateUser } from '../services/AuthService';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',  
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const updateProfile = () => {
    updateUser(userDetails.name, userDetails.email, userDetails.phone, userDetails.bio)  // Inclua bio
      .then(() => {
        console.log("User updated successfully");
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  }

  const deleteAccount = () => {
    const confirmed = window.confirm("Are you sure want to delete your account? This action cannot be undone.");

    if (confirmed) {
      deleteUser();
      navigate("/login");
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUserDetails({
          name: data.user.name || '',
          email: data.user.email || '',
          phone: data.user.phoneNumber || '',
          bio: data.user.bio || '', 
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate('/login');
      }
    };

    fetchProfile();
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
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                onClick={updateProfile}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Save Changes
              </button>
            </div>

            <div className="bg-blue-500 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
              <textarea
                value={userDetails.bio}
                onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                placeholder="Short Bio"
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="5"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                logoutUser();
                navigate('/');
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={deleteAccount}
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
