function Navbar() {
  return (
    <nav className="bg-yellow-500 text-white p-2 shadow-md border-2 border-black w-[15%] h-auto">
      <div className="container mx-auto flex-row justify-between items-center ">
        <h2 className="text-xl text-start font-bold mb-4">MENU</h2>
        <ul className="flex flex-col space-y-2">
          <li className="hover:bg-yellow-600 transition-colors duration-200">
            <a href="/a">ENTRADA</a>
          </li>
          <li className="hover:bg-yellow-600 transition-colors duration-200">
            <a href="/b">SAIDA</a>
          </li>
          <li className="hover:bg-yellow-600 transition-colors duration-200">
            <a href="/c">TRANSAÇÕES</a>
          </li>
          <li className="hover:bg-yellow-600 transition-colors duration-200">
            <a href="/d">GRÁFICOS</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
