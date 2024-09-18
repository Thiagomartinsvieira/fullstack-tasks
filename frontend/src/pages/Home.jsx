import Footer from '../components/Footer';
import Nav from '../components/Nav';

const Home = () => {

  const token = localStorage.getItem("token")

  return (
    <>
      <Nav />
      <div className="relative overflow-hidden bg-gray-900">
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-cover bg-center" style={{ backgroundImage: 'url(./images/home/home_image1.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-5xl font-bold text-white mb-4">Welcome to TaskMaster</h1>
            <p className="text-lg text-gray-300 mb-8">Manage your tasks efficiently and stay organized.</p>
          {!token && (
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
          )}
          </div>
        </div>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="./images/home/home_image2.jpg" alt="Feature 1" className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Organize Tasks</h3>
                <p>Efficiently manage and track your tasks in one place.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="./images/home/home_image3.jpg" alt="Feature 2" className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Set Deadlines</h3>
                <p>Never miss a deadline with our intuitive scheduling features.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="./images/home/home_image4.jpg" alt="Feature 3" className="w-12 h-12 mb-4" />
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
