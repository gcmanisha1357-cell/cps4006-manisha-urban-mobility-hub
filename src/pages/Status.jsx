import { useEffect, useState } from "react";

function Status() {
  const [lines, setLines] = useState([]);
  const [mode, setMode] = useState("tube");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const modes = [
    { value: "tube", label: "London Underground" },
    { value: "overground", label: "Overground" },
    { value: "dlr", label: "DLR" },
    { value: "elizabeth-line", label: "Elizabeth Line" },
    { value: "national-rail", label: "National Rail" }
  ];

  const getStatusStyle = (status) => {
    if (status === "Good Service") return "goodStatus";
    if (status.includes("Minor")) return "minorStatus";
    if (status.includes("Severe") || status.includes("Suspended")) return "badStatus";
    if (status.includes("Special")) return "specialStatus";
    return "warningStatus";
  };

  const getStatusIcon = (status) => {
    if (status === "Good Service") return "✔️";
    if (status.includes("Minor")) return "⚠️";
    if (status.includes("Severe") || status.includes("Suspended")) return "⛔";
    if (status.includes("Special")) return "ℹ️";
    return "⚠️";
  };

  const loadStatus = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/Line/Mode/${mode}/Status`
      );

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setLines([]);
        setMessage("No live service information found.");
      } else {
        setLines(data);
      }
    } catch {
      setLines([]);
      setMessage("Could not load live TfL service status.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, [mode]);

  const currentModeLabel =
    modes.find((item) => item.value === mode)?.label || "Transport";

  return (
    <div className="page">
      <h2>Live Transport Status</h2>

      <p className="pageIntro">
        Check real-time Transport for London updates before starting your journey.
      </p>

      <div className="modeSection">
        <h3>Select Transport Mode</h3>

        <div className="statusControls">
          {modes.map((item) => (
            <button
              key={item.value}
              className={mode === item.value ? "activeMode" : ""}
              onClick={() => setMode(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="modeHeader">
        <h3>{currentModeLabel}</h3>
        <span>Live Service Overview</span>
      </div>

      {loading && (
        <div className="emptyState">
          <h3>Loading live service updates...</h3>
          <p>Connecting to TfL data.</p>
        </div>
      )}

      {message && !loading && <div className="result">{message}</div>}

      {!loading && lines.length > 0 && (
        <div className="statusGrid">
          {lines.map((line) => {
            const status = line.lineStatuses?.[0];
            const statusText =
              status?.statusSeverityDescription || "Status unavailable";
            const reason =
              status?.reason || "No disruption reported.";

            return (
              <div className="statusCard" key={line.id}>
                <div>
                  <h3>{line.name}</h3>
                  <p>{reason}</p>

                  {statusText.includes("Special") && (
                    <p className="statusNote">
                      This service is operating under a modified timetable due to planned changes or engineering work.
                    </p>
                  )}

                  {line.disruptions?.[0]?.additionalInfo && (
                    <a
                      href={line.disruptions[0].additionalInfo}
                      target="_blank"
                      rel="noreferrer"
                      className="statusLink"
                    >
                      View official details →
                    </a>
                  )}
                </div>

                <span className={getStatusStyle(statusText)}>
                  {getStatusIcon(statusText)} {statusText}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Status;