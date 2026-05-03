import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Comparison from "./pages/Comparison";
import Status from "./pages/Status";
import Dashboard from "./pages/Dashboard";
import Accessibility from "./pages/Accessibility";
import Modes from "./pages/Modes";
import Sustainability from "./pages/Sustainability";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "home") return <Home setPage={setPage} />;
    if (page === "journey") return <Journey />;
    if (page === "modes") return <Modes />;
    if (page === "comparison") return <Comparison />;
    if (page === "status") return <Status />;
    if (page === "dashboard") return <Dashboard />;
    if (page === "sustainability") return <Sustainability />;
    if (page === "accessibility") return <Accessibility />;

    return <Home setPage={setPage} />;
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;