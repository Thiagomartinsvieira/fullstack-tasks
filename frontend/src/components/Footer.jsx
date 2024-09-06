

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-4 ">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
              <a href="https://portfolio-plum-rho-75.vercel.app/" target="_blank" className="hover:underline">Contact</a>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer