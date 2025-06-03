import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <div className={darkMode ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <Header />
        <main className="p-4">Conteúdo principal aqui futuramente...</main>
        <Footer />
      </div>
    </>
  );
}

export default App;
