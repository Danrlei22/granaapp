import { FiMenu } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { FiArrowUpCircle, FiArrowDownCircle, FiRepeat } from "react-icons/fi";
import { toggleMenu } from "../redux/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isOpen);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <nav
      className={`bg-yellow-500 text-white p-2 shadow-md  w-[100%] md:w-[200px] text-center md:text-start overflow-hidden transition-all duration-500 ${
        isMenuOpen ? "h-[300px]" : "h-[40px] md:w-[150px]"
      }`}
    >
      <div className="container mx-auto flex-row justify-between items-center ">
        <div className="flex items-center mb-4 justify-center md:justify-start pl-1">
          <button onClick={handleToggleMenu} className="flex items-center md:border-b-4 md:border-green-700 md:w-auto">
            <FiMenu className="text-[22px]" />
            <h2 className="text-xl font-bold pl-2 leading-none">MENU</h2>
          </button>
        </div>
        {isMenuOpen && (
          <ul className="flex flex-col space-y-2">
            <li className="w-full md:justify-start">
              <a
                href="/a"
                className="flex items-center justify-center md:justify-start hover:bg-yellow-600 transition-colors duration-200 px-2"
              >
                <FiArrowUpCircle className="text-[22px] text-green-700" />
                <span className="pl-2">ENTRADA</span>
              </a>
            </li>
            <li className="w-full md:justify-start">
              <a
                href="/b"
                className="flex items-center justify-center md:justify-start hover:bg-yellow-600 transition-colors duration-200 px-2"
              >
                <FiArrowDownCircle className="text-[22px] text-red-500" />
                <span className="pl-2">SAIDA</span>
              </a>
            </li>

            <li className="w-full md:justify-start">
              <a
                href="/c"
                className="flex items-center justify-center md:justify-start hover:bg-yellow-600 transition-colors duration-200 px-2"
              >
                <div className="relative w-[22px] h-[22px]">
                  <FiRepeat
                    className="absolute top-0 left-0"
                    size={22}
                    style={{ color: "green", clipPath: "inset(0 0 50% 0 )" }}
                  />
                  <FiRepeat
                    className="absolute top-0 left-0"
                    size={22}
                    style={{ color: "red", clipPath: "inset(50% 0 0 0)" }}
                  />
                </div>
                <span className="pl-2">TRANSAÇÕES</span>
              </a>
            </li>
            <li className="w-full md:justify-start">
              <a
                href="/d"
                className="flex items-center justify-center md:justify-start hover:bg-yellow-600 transition-colors duration-200 px-2"
              >
                <GoGraph className="text-[22px] text-blue-500" />
                <span className="pl-2">GRÁFICOS</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
