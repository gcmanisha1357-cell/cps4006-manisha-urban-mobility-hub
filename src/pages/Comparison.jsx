function Comparison() {
  const modes = [
    {
      name: "Bus",
      cost: "Low",
      speed: "Medium",
      co2: "Medium",
      comfort: "Medium",
      bestFor: "Short and medium journeys",
      note: "Affordable and widely available, but can be affected by traffic."
    },
    {
      name: "Tube",
      cost: "Medium",
      speed: "Fast",
      co2: "Low",
      comfort: "Medium",
      bestFor: "Fast travel across London",
      note: "Useful for avoiding road traffic, but can be crowded during peak times."
    },
    {
      name: "Train",
      cost: "Higher",
      speed: "Very fast",
      co2: "Low",
      comfort: "High",
      bestFor: "Longer-distance travel",
      note: "Good for outer London and longer routes, but usually costs more."
    },
    {
      name: "Cycling",
      cost: "Free / low",
      speed: "Medium",
      co2: "Zero",
      comfort: "Depends",
      bestFor: "Local sustainable journeys",
      note: "Healthy and sustainable, but weather and road safety matter."
    },
    {
      name: "Walking",
      cost: "Free",
      speed: "Slow",
      co2: "Zero",
      comfort: "High",
      bestFor: "Very short trips",
      note: "Best for short journeys and completely environmentally friendly."
    }
  ];

  return (
    <div className="page">
      <h2>Travel Comparison</h2>

      <p className="pageIntro">
        Compare common travel options by cost, speed, comfort and sustainability.
        For exact fares, use the live Journey Planner.
      </p>

      <div className="comparisonGrid">
        {modes.map((mode) => (
          <div className="comparisonCard" key={mode.name}>
            <h3>{mode.name}</h3>
            <p>{mode.note}</p>

           <div className="comparisonStats">
  <span className={mode.cost === "Low" || mode.cost === "Free" ? "best" : ""}>
    Cost: {mode.cost}
  </span>

  <span className={mode.speed === "Very fast" || mode.speed === "Fast" ? "best" : ""}>
    Speed: {mode.speed}
  </span>

  <span className={mode.co2 === "Zero" || mode.co2 === "Low" ? "bestEco" : ""}>
    CO₂ Impact: {mode.co2}
  </span>

  <span>Comfort: {mode.comfort}</span>
</div>
            <strong className="bestFor">Best for: {mode.bestFor}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comparison;