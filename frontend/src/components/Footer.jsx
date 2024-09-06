const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="https://portfolio-plum-rho-75.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
