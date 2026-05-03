function Navbar({ page, setPage }) {
  return (
    <header className="navbar">
      <div className="logo" onClick={() => setPage("home")}>
        <span>SMU</span>
        <div>
          <h1>Urban Mobility Hub</h1>
          <p>St Mary’s University Travel Platform</p>
        </div>
      </div>

      <nav>
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "journey" ? "active" : ""}
          onClick={() => setPage("journey")}
        >
          Journey Planner
        </button>

        <button
          className={page === "modes" ? "active" : ""}
          onClick={() => setPage("modes")}
        >
          Travel Modes
        </button>

        <button
          className={page === "comparison" ? "active" : ""}
          onClick={() => setPage("comparison")}
        >
          Comparison
        </button>

        <button
          className={page === "status" ? "active" : ""}
          onClick={() => setPage("status")}
        >
          Live Status
        </button>

        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "sustainability" ? "active" : ""}
          onClick={() => setPage("sustainability")}
        >
          Sustainability
        </button>

        <button
          className={page === "accessibility" ? "active" : ""}
          onClick={() => setPage("accessibility")}
        >
          Accessibility
        </button>
      </nav>
    </header>
  );
}

export default Navbar;