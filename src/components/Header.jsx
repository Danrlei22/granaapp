import logo from "../assets/logo.png";

import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

function Header() {
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className=" flex-col sm:flex-row bg-primary text-white p-4 flex justify-around items-center h-auto">
      <div className="flex items-center space-x pl-0 sm:pl-10">
        <a href="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="GranaApp Logoooo"
            className="h-[50px] w-[50px]"
          />
          <h1 className="text-3xl font-bold">GranaApp</h1>
        </a>
      </div>
      <nav className="w-[100%] sm:w-auto flex justify-center">
        <ul className="flex space-x-10 justify-end pr-4 sm:pr-0">
          <li>
            <a
              href="/"
              className="hover:text-black hover:font-bold transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-black hover:font-bold transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-black hover:font-bold transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <button
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
          onClick={handleThemeToggle}
        >
          Alterar tema
        </button>
      </div>
    </header>
  );
}

export default Header;
