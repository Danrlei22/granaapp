import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

function Main({ showSideMenu = true }) {
  return (
    <main className="min-h-screen flex md:flex-row flex-col">
      {showSideMenu && <SideMenu />}
      <Outlet />
    </main>
  );
}

export default Main;
