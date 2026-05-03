function Accessibility() {
  return (
    <div className="page">
      <h2>Accessibility & Inclusive Design</h2>

      <p className="pageIntro">
        This page explains how the Urban Mobility Hub is designed for different
        users, including people with visual, mobility, and accessibility needs.
      </p>

      <section className="accessHero">
        <div>
          <h3>Travel should be simple for everyone</h3>
          <p>
            The application uses clear navigation, readable colours, keyboard
            support and simple journey information so users can plan travel with
            confidence.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80"
          alt="Person using a laptop for accessible digital services"
        />
      </section>

      <div className="accessGrid">
        <div className="accessCard">
          <span>🧭</span>
          <h3>Clear Navigation</h3>
          <p>
            Pages are organised clearly so users can move between journey
            planning, live status, comparison and dashboard sections easily.
          </p>
        </div>

        <div className="accessCard">
          <span>👁️</span>
          <h3>Readable Interface</h3>
          <p>
            The design uses strong colour contrast, large headings and readable
            spacing to support users with visual difficulties.
          </p>
        </div>

        <div className="accessCard">
          <span>⌨️</span>
          <h3>Keyboard Friendly</h3>
          <p>
            Buttons, inputs and navigation items can be accessed using normal
            keyboard controls, improving usability for users without a mouse.
          </p>
        </div>

        <div className="accessCard">
          <span>📱</span>
          <h3>Responsive Design</h3>
          <p>
            The layout adjusts for laptops, tablets and mobile screens so users
            can access the app on different devices.
          </p>
        </div>

        <div className="accessCard">
          <span>🚶</span>
          <h3>Inclusive Travel Modes</h3>
          <p>
            The app supports public transport, walking and cycling options,
            giving users different choices based on their needs.
          </p>
        </div>

        <div className="accessCard">
          <span>💬</span>
          <h3>Helpful Feedback</h3>
          <p>
            Error messages and loading messages guide users when TfL data is
            loading or when a journey cannot be found.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Accessibility;