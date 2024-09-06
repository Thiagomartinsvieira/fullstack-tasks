import Footer from '../components/Footer';
import Nav from '../components/Nav';

const Home = () => {
  return (
    <>
      <Nav />
      <div className="relative overflow-hidden bg-gray-900">
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/serious-unshaven-man-drinks-takeaway-coffee-colorful-blank-stickers-attached-wall-drinks-coffee-from-paper-cup-holds-notepads_273609-34096.jpg?w=1060&t=st=1725585760~exp=1725586360~hmac=aaf767d079748dc7ce3be9246346fb178849a05f335c34212610e8f309f68616)' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-5xl font-bold text-white mb-4">Welcome to TaskMaster</h1>
            <p className="text-lg text-gray-300 mb-8">Manage your tasks efficiently and stay organized.</p>
            <div className="flex justify-center space-x-4">
              <a
                href="/register"
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://img.freepik.com/free-vector/task-distribution-concept-interaction-departments-business-teamwork-management-business-profit-financial-growth-isolated-flat-vector-illustration_613284-3399.jpg?w=1060&t=st=1725585812~exp=1725586412~hmac=0a75205bc19576df182341c522edaeb68a6dff11fe528cbc459193f389f1f8da" alt="Feature 1" className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Organize Tasks</h3>
                <p>Efficiently manage and track your tasks in one place.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://img.freepik.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?w=740&t=st=1725585835~exp=1725586435~hmac=6f7f3d809071418ff31967c3d1560a38006b714de390cfbb8fbf998abef9ab6b" alt="Feature 2" className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Set Deadlines</h3>
                <p>Never miss a deadline with our intuitive scheduling features.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://img.freepik.com/free-vector/flat-scrum-task-board-with-color-stick-paper-notes_88138-931.jpg?w=1060&t=st=1725585844~exp=1725586444~hmac=d54d7399a8c02c6f30bafdb9f88838807797371cbb09ebd36953377b0d7eb66a" alt="Feature 3" className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Collaborate Easily</h3>
                <p>Work with your team seamlessly and share tasks effortlessly.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <p className="text-lg mb-4">"TaskMaster has revolutionized the way I manage my tasks. The interface is intuitive and the features are incredibly useful."</p>
                <p className="font-semibold">Dayane Cordeiro</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <p className="text-lg mb-4">"An amazing tool for staying organized and productive. I can't imagine working without it."</p>
                <p className="font-semibold">Sisleide Costa</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
