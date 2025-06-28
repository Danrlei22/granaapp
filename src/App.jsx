import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Help from "./pages/Help";
import Entry from "./pages/Entry";
import Exit from "./pages/Exit";
import Summary from "./pages/Summary";
import Graphics from "./pages/Graphics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/graphics" element={<Graphics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
