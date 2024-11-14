// components/Chariot.js
import React from "react";

function Chariot() {
  return (
    <div style={{ padding: "20px", color: "#fff", textAlign: "center" }}>
      <h1>Chariot: Ride Share Application</h1>
      <p>
        Chariot is a ride-sharing application that allows users to either sign
        up as drivers or riders, featuring real-time ride matching, Mapbox API
        integration for location services, and Firebase for backend support.
      </p>
      <h3>Technologies Used</h3>
      <ul style={{ listStyle: "none" }}>
        <li>JavaScript</li>
        <li>React</li>
        <li>Firebase</li>
      </ul>
    </div>
  );
}

export default Chariot;