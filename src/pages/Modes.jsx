function Modes() {
  const modes = [
    {
      name: "Bus",
      img: "/images/bus.jpg",
      desc: "Buses are one of the most affordable and widely available ways to travel across London.",
      best: "Short to medium journeys",
      pros: "Low cost, frequent, wide coverage",
      cons: "Can be delayed due to traffic"
    },
    {
      name: "Tube",
      img: "/images/tube.jpg",
      desc: "The London Underground is the fastest way to travel across central London.",
      best: "Fast city travel",
      pros: "Very fast, avoids traffic, frequent",
      cons: "Can be crowded, higher cost"
    },
    {
      name: "Train",
      img: "/images/train.jpg",
      desc: "Rail services are ideal for travelling longer distances across London and beyond.",
      best: "Long-distance travel",
      pros: "Very fast, comfortable",
      cons: "More expensive than other options"
    },
    {
      name: "Cycling",
      img: "/images/cycling.jpg",
      desc: "Cycling is a sustainable and healthy way to travel short distances.",
      best: "Local journeys",
      pros: "No cost, eco-friendly, healthy",
      cons: "Weather dependent, safety concerns"
    },
    {
      name: "Walking",
      img: "/images/walking.jpg",
      desc: "Walking is the simplest and most accessible option for short distances.",
      best: "Very short trips",
      pros: "Free, healthy, zero emissions",
      cons: "Slow for longer journeys"
    }
  ];

  return (
    <div className="page">
      <h2>Travel Modes</h2>

      <p className="pageIntro">
        Explore different ways to travel in London and understand when each option is most suitable.
      </p>

      <div className="modesGrid">
        {modes.map((mode) => (
          <div className="modeCard" key={mode.name}>
            <img src={mode.img} alt={mode.name} />

            <div className="modeContent">
              <h3>{mode.name}</h3>
              <p className="modeBest">Best for: {mode.best}</p>

              <p>{mode.desc}</p>

              <div className="modeInfo">
                <span>✔ {mode.pros}</span>
                <span>✖ {mode.cons}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modes;