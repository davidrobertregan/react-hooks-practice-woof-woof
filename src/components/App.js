import React from "react";
import { useState, useEffect } from 'react';

function App() {

  const [pups, setPups] = useState([])
  const [featPup, setFeatPup] = useState(null)

  const getPups = () => {
    fetch("http://localhost:3001/pups")
    .then(resp => resp.json())
    .then(pups => setPups(pups))
  }

  useEffect(getPups, [])

  let pupSpans = pups.map(p => <span>{p.name}</span>)

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        {pupSpans}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">

        </div>
      </div>
    </div>
  );
}

export default App;
