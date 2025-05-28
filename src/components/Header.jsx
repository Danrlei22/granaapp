import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center h-[80px]">
      <div className="flex items-center space-x pl-10">
        <a href="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="GranaApp Logoooo"
            className="h-[50px] w-[50px]"
          />
          <h1 className="text-3xl font-bold">GranaApp</h1>
        </a>
      </div>
      <nav className="w-[30%]">
        <ul className="flex space-x-10 justify-end pr-4">
          <li>
            <a href="/" className="hover:text-black hover:font-bold transition-colors duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-black hover:font-bold transition-colors duration-300">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-black hover:font-bold transition-colors duration-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
