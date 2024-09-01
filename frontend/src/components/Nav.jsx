import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav
        className="block w-full max-w-screen-xl px-6 py-3 mx-auto text-white border shadow-md rounded-xl 
  border-white/80 bg-opacity-80 bg-black backdrop-blur-2xl backdrop-saturate-200"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <a
            href="#"
            className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased"
          >
            Tasks Management
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                <a
                  href="#"
                  className="flex items-center transition-colors hover:text-blue-500"
                >
                  Pages
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                <a
                  href="#"
                  className="flex items-center transition-colors hover:text-blue-500"
                >
                  Account
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                <Link to={"/register"}>
                Register
                </Link>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
