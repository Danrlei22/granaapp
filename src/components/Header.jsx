import logo from "../assets/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

function Header() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

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
        <ul className="flex space-x-10 justify-end sm:pr-0">
          <li>
            <a
              href="/"
              className="hover:bg-green-600 hover:rounded-lg hover:font-bold p-3"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:bg-green-600 hover:rounded-lg hover:font-bold p-3"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:bg-green-600 hover:rounded-lg hover:font-bold p-3"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <button
          onClick={handleThemeToggle}
          className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ml-4 ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          <span
            className={`inline-block w-5 h-5 transform  rounded-full transition-transform duration-300 ${
              isDarkMode ? "translate-x-6 bg-white" : "translate-x-1 bg-black"
            }`}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
