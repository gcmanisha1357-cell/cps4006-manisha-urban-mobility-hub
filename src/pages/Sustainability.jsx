function Sustainability() {
  const data = [
    { mode: "Bus", co2: "≈ 82g", level: "Medium", note: "Uses fuel but shared transport reduces per-person emissions." },
    { mode: "Tube", co2: "≈ 55g", level: "Low", note: "Electric and carries many passengers efficiently." },
    { mode: "Train", co2: "≈ 41g", level: "Low", note: "Efficient for long-distance travel with lower emissions per person." },
    { mode: "Cycling", co2: "0g", level: "Zero", note: "No emissions and environmentally friendly." },
    { mode: "Walking", co2: "0g", level: "Zero", note: "Most sustainable option with health benefits." }
  ];

  return (
    <div className="page">
      <h2>Sustainability & Environmental Impact</h2>

      <p className="pageIntro">
        This section shows the approximate CO₂ impact of different transport modes.
        Lower CO₂ means a more environmentally friendly choice.
      </p>

      <div className="sustainGrid">
        {data.map((item) => (
          <div className="sustainCard" key={item.mode}>
            <h3>{item.mode}</h3>

            <div className="sustainStats">
              <span>CO₂: {item.co2} per km</span>
              <span>Impact: {item.level}</span>
            </div>

            <p>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="panel">
        <h3>Why this matters</h3>
        <p>
          Choosing sustainable transport such as walking, cycling or public transport
          helps reduce pollution and supports a healthier environment.
          The values shown are approximate and may vary depending on usage.
        </p>
      </div>
    </div>
  );
}

export default Sustainability;