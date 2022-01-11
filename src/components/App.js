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

  const onPupClick = (e) => {
    const name = e.target.textContent
    const pup = pups.filter(p => p.name === name)[0]
    setFeatPup(pup)
  }

  console.log(featPup)

  useEffect(getPups, [])

  let pupSpans = pups.map(p => <span key={p.id} onClick={onPupClick}>{p.name}</span>)

  let pupInfo = featPup ? <><img src={featPup.image} alt={featPup.className} /><h2>{featPup.name}</h2> <button>{featPup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button></> : null

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
          {pupInfo}
        </div>
      </div>
    </div>
  );
}

export default App;
