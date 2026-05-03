import { useEffect, useState } from "react";

function Dashboard() {
  const [saved, setSaved] = useState([]);
  const [preferredMode, setPreferredMode] = useState(
    localStorage.getItem("preferredMode") || "Bus"
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedJourneys")) || [];
    setSaved(data);
  }, []);

  const removeJourney = (index) => {
    const updated = saved.filter((_, i) => i !== index);
    setSaved(updated);
    localStorage.setItem("savedJourneys", JSON.stringify(updated));
  };

  const clearAll = () => {
    setSaved([]);
    localStorage.removeItem("savedJourneys");
  };

  const updatePreferredMode = (mode) => {
    setPreferredMode(mode);
    localStorage.setItem("preferredMode", mode);
  };

  const totalSaved = saved.length;

  return (
    <div className="page">
      <h2>Personal Travel Dashboard</h2>

      <p className="pageIntro">
        Save favourite journeys, view travel habits and manage preferred travel
        options in one place.
      </p>

      <section className="dashboardHero">
        <div>
          <h3>Your London travel space</h3>
          <p>
            This dashboard helps users quickly access saved journeys and keep
            track of regular travel choices.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80"
          alt="London transport dashboard"
        />
      </section>

      <div className="dashboardSummary">
        <div className="summaryCard">
          <h3>{totalSaved}</h3>
          <p>Saved journeys</p>
        </div>

        <div className="summaryCard">
          <h3>{preferredMode}</h3>
          <p>Preferred mode</p>
        </div>

        <div className="summaryCard">
          <h3>Live</h3>
          <p>TfL data used</p>
        </div>
      </div>

      <section className="panel dashboardPanel">
        <h3>Preferred Travel Mode</h3>
        <p>Choose the travel mode you use most often.</p>

        <div className="modeButtons">
          {["Bus", "Tube", "Train", "Walking", "Cycling"].map((mode) => (
            <button
              key={mode}
              className={preferredMode === mode ? "activeMode" : ""}
              onClick={() => updatePreferredMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      {saved.length === 0 ? (
        <div className="emptyState">
          <h3>No saved journeys yet</h3>
          <p>
            Go to the Journey Planner, search for a route and click “Save
            Journey”.
          </p>
        </div>
      ) : (
        <>
          <div className="dashboardTop">
            <h3>Saved Journeys</h3>
            <button className="secondaryBtn" onClick={clearAll}>
              Clear All
            </button>
          </div>

          <div className="dashboardGrid">
            {saved.map((item, index) => (
              <div className="dashboardCard" key={index}>
                <div className="journeyIcon">📍</div>

                <h3>
                  {item.from} → {item.to}
                </h3>

                <div className="dashboardStats">
                  <span>⏱️ {item.duration} mins</span>
                  <span>💷 {item.cost}</span>
                </div>

                <button onClick={() => removeJourney(index)}>
                  Remove Journey
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;