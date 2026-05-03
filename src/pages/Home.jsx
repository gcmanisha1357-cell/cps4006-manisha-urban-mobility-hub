function Home({ setPage }) {
  return (
    <div className="page">
      <section className="homeSimple">
        <div className="homeText">
          <h2>Plan your journey across London with confidence.</h2>

          <p>
            Use real Transport for London data to compare routes, check service
            status and make better travel decisions.
          </p>

          <div className="homeActions">
            <button className="primaryBtn" onClick={() => setPage("journey")}>
              Plan a Journey
            </button>

            <button className="secondaryBtn" onClick={() => setPage("status")}>
              Check Live Status
            </button>
          </div>
        </div>

        <div className="homeImage">
          <img
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
            alt="London transport"
          />
        </div>
      </section>

      <section className="homeFeatures">
        <div className="featureBox">
          <h3>Journey Planning</h3>
          <p>Find the fastest and most efficient routes using TfL data.</p>
        </div>

        <div className="featureBox">
          <h3>Live Status</h3>
          <p>Stay updated with real-time service information.</p>
        </div>

        <div className="featureBox">
          <h3>Smart Decisions</h3>
          <p>Compare routes based on time, cost and convenience.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;