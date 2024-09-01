import Nav from '../components/Nav';

const Home = () => {
  return (
    <>
      <Nav />
      <div
        className="flex flex-col items-center justify-center 
    min-h-screen bg-gray-900"
      >
        <header className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to TaskMaster
        </header>
        <p className="text-lg text-gray-700 mb-8">
          Manage your tasks efficiently and stay organized.
        </p>
        <div className="flex space-x-4">
          <a
            href="/register"
            className="px-6 py-2 bg-blue-500 text-white 
        rounded-full hover:bg-blue-600"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-2 bg-gray-500 text-white 
        rounded-full hover:bg-gray-600"
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
