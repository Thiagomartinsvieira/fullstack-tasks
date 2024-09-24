import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Reports = () => {
  const [reports] = useState([
    {
      id: 1,
      title: 'Monthly Performance Report',
      description: 'This report shows the overall performance for the past month.',
      completionRate: 85,
      date: '2024-09-15',
    },
    {
      id: 2,
      title: 'Weekly Insights',
      description: 'A brief overview of your tasks completed and pending.',
      completionRate: 92,
      date: '2024-09-08',
    },
  ]);
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Nav />
      <div className="flex-grow container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Reports</h1>
          <p className="text-gray-600 mb-4">
            Here you can view your performance reports and insights.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h2 className="text-2xl font-semibold mb-2">{report.title}</h2>
                  <p className="mb-4">{report.description}</p>
                  <p className="font-semibold">Completion Rate: {report.completionRate}%</p>
                  <p className="text-sm text-gray-600">Generated on: {new Date(report.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No reports available at this time.</p>
            )}
          </div>

          <div className="mt-10">
            <button
              onClick={() => navigate('/')}
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
