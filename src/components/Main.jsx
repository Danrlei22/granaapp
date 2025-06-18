import Home from "../pages/Home";
import Navbar from "./Navbar";

function Main() {
    return (
        <main className="min-h-screen flex md:flex-row flex-col">
            <Navbar />
            <Home />
        </main>
    )
}
export default Main;