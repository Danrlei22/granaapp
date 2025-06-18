import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <div
        className={
          darkMode
            ? "bg-black text-white min-h-screen min-w-[350px]"
            : "bg-white text-black min-h-screen min-w-[350px]"
        }
      >
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
