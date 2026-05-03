import { useEffect, useState } from "react";

function Journey() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const searchPlaces = async (value, type) => {
    if (value.trim().length < 3) {
      type === "from" ? setFromSuggestions([]) : setToSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/StopPoint/Search?query=${encodeURIComponent(value)}`
      );

      const data = await response.json();
      const matches = data.matches?.slice(0, 8) || [];

      type === "from" ? setFromSuggestions(matches) : setToSuggestions(matches);
    } catch {
      setMessage("Could not load TfL suggestions.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => searchPlaces(from, "from"), 400);
    return () => clearTimeout(timer);
  }, [from]);

  useEffect(() => {
    const timer = setTimeout(() => searchPlaces(to, "to"), 400);
    return () => clearTimeout(timer);
  }, [to]);

  const choosePlace = (place, type) => {
    if (type === "from") {
      setFrom(place.name);
      setSelectedFrom(place);
      setFromSuggestions([]);
    } else {
      setTo(place.name);
      setSelectedTo(place);
      setToSuggestions([]);
    }
  };

  const getJourneyPoint = (place) => {
    if (place.lat && place.lon) return `${place.lat},${place.lon}`;
    if (place.icsId) return place.icsId;
    return place.id;
  };

  const getIcon = (mode) => {
    if (mode === "walking") return "🚶";
    if (mode === "bus") return "🚌";
    if (mode === "tube") return "🚇";
    if (mode === "overground") return "🚆";
    if (mode === "national-rail") return "🚆";
    if (mode === "elizabeth-line") return "🚄";
    return "➡️";
  };

  const saveJourney = (journey) => {
    const saved = JSON.parse(localStorage.getItem("savedJourneys")) || [];

    const newJourney = {
      from,
      to,
      duration: journey.duration,
      cost: journey.fare?.totalCost
        ? `£${(journey.fare.totalCost / 100).toFixed(2)}`
        : "N/A"
    };

    localStorage.setItem(
      "savedJourneys",
      JSON.stringify([newJourney, ...saved])
    );

    alert("Journey saved!");
  };

  const planJourney = async () => {
    if (!selectedFrom || !selectedTo) {
      setMessage("Please select both locations from the TfL suggestions.");
      return;
    }

    setLoading(true);
    setJourneys([]);
    setMessage("");

    const startPoint = getJourneyPoint(selectedFrom);
    const endPoint = getJourneyPoint(selectedTo);

    try {
      const response = await fetch(
        `https://api.tfl.gov.uk/Journey/JourneyResults/${encodeURIComponent(startPoint)}/to/${encodeURIComponent(endPoint)}?mode=bus,tube,overground,dlr,elizabeth-line,national-rail,walking`
      );

      const data = await response.json();

      if (!data.journeys || data.journeys.length === 0) {
        setMessage("No journey found. Try selecting a more specific station suggestion.");
      } else {
        setJourneys(data.journeys.slice(0, 3));
      }
    } catch {
      setMessage("Failed to load TfL journey data.");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <h2>Live TfL Journey Planner</h2>

      <p className="pageIntro">
        Search London stations, stops or postcodes, select a suggestion, and view real TfL journey options.
      </p>

      <div className="journeyLayout">
        <div className="panel">
          <h3>Plan Your Route</h3>

          <div className="form">
            <label>From</label>
            <div className="suggestBox">
              <input
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setSelectedFrom(null);
                }}
                placeholder="Example: Hounslow Rail Station"
              />

              {fromSuggestions.length > 0 && (
                <div className="suggestions">
                  {fromSuggestions.map((place) => (
                    <button key={place.id} onClick={() => choosePlace(place, "from")}>
                      <strong>{place.name}</strong>
                      <span>{place.modes?.join(", ")}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <label>To</label>
            <div className="suggestBox">
              <input
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setSelectedTo(null);
                }}
                placeholder="Example: Harrow-on-the-Hill"
              />

              {toSuggestions.length > 0 && (
                <div className="suggestions">
                  {toSuggestions.map((place) => (
                    <button key={place.id} onClick={() => choosePlace(place, "to")}>
                      <strong>{place.name}</strong>
                      <span>{place.modes?.join(", ")}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="primaryBtn" onClick={planJourney}>
              {loading ? "Loading..." : "Find Journey"}
            </button>

            {message && <div className="result">{message}</div>}
          </div>
        </div>

        <div className="journeyResult">
          {!journeys.length && !loading && (
            <div className="emptyState">
              <h3>Results will appear here</h3>
              <p>Choose locations from the dropdown suggestions for accurate TfL results.</p>
            </div>
          )}

          {loading && (
            <div className="emptyState">
              <h3>Loading live TfL data...</h3>
            </div>
          )}

          {journeys.length > 0 && (
            <div className="liveResults">
              {journeys.map((j, index) => (
                <div className="resultCard" key={index}>
                  <span className="badge">Option {index + 1}</span>
                  <h3>{j.duration} minutes</h3>

                  <div className="journeyStats">
                    <div>
                      <strong>{j.legs.length}</strong>
                      <span>Stages</span>
                    </div>

                    <div>
                      <strong>
                        {j.fare?.totalCost
                          ? `£${(j.fare.totalCost / 100).toFixed(2)}`
                          : "N/A"}
                      </strong>
                      <span>Total estimated cost</span>
                    </div>
                  </div>

                  <p className="fareNote">
                    Estimated total fare based on TfL data.
                  </p>

                  <button
                    className="secondaryBtn"
                    onClick={() => saveJourney(j)}
                  >
                    Save Journey
                  </button>

                  <div className="legs">
                    {j.legs.map((leg, i) => (
                      <div className="legItemPremium" key={i}>
                        <div className="legIcon">{getIcon(leg.mode.name)}</div>

                        <div className="legContent">
                          <strong className="legTitle">{leg.mode.name}</strong>
                          <span className="legText">{leg.instruction.summary}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Journey;