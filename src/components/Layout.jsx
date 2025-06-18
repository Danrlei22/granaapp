import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useSelector } from "react-redux";

function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const location = useLocation();

  // Define routes where the side menu should not be displayed
  const noSideMenuRoutes = ["/about" ,"/contact"];
  const hideSideMenu =  noSideMenuRoutes.includes(location.pathname);

  return (
    <div
      className={
        darkMode
          ? "bg-black text-white min-h-screen min-w-[350px]"
          : "bg-white text-black min-h-screen min-w-[350px]"
      }
    >
      <Header />
      <Main showSideMenu={!hideSideMenu}/>
      <Footer />
    </div>
  );
}

export default Layout;
