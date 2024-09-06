import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name || 'Anonymous User');

        // Simulated data for activities and notifications up comming
        setRecentActivities([
          { id: 1, action: 'Created new task: "Complete project setup"' },
          { id: 2, action: 'Marked task "Research dashboard design" as done' },
          { id: 3, action: 'Updated profile information' },
        ]);

        setNotifications([
          { id: 1, message: 'Reminder: Task "Submit report" is due tomorrow' },
          { id: 2, message: 'You have a new message from Admin' },
        ]);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Nav />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome, {userName}!</h1>
          <p className="text-gray-600 mb-4">
            This is your personalized dashboard. Manage your account, check your tasks, view reports, and more!
          </p>

         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
              <p className="text-white">View and manage your tasks with ease.</p>
              <button className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md">Go to Tasks</button>
            </div>

            
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
              <p className="text-white">Manage your account settings and update your profile.</p>
              <button className="mt-4 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md">
                Manage Account
              </button>
            </div>

            
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4">Reports</h2>
              <p className="text-white">Check your performance reports and insights.</p>
              <button className="mt-4 px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-md">
                View Reports
              </button>
            </div>
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            
            <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
              <ul className="space-y-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="border-b pb-2">
                    {activity.action}
                  </li>
                ))}
              </ul>
            </div>

          
            <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Notifications</h2> 
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li key={notification.id} className="border-b pb-2">
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="mt-10">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all duration-300"
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

export default Dashboard;
