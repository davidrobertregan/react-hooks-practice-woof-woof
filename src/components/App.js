import React from "react";
import { useState, useEffect } from 'react';

function App() {

  const [pups, setPups] = useState([])
  const [featPup, setFeatPup] = useState(null)
  const [filterToggle, setFilterToggle] = useState(false)

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

  const onGoodBad = () => {
    
    setFeatPup({...featPup, isGoodDog: !featPup.isGoodDog})
    
    const body = {
      ...featPup,
      isGoodDog: !featPup.isGoodDog
    }
    fetch(`http://localhost:3001/pups/${featPup.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  }

  const onFilterClick = () => {
    if(!filterToggle){
      let goodDogs = pups.filter(p => p.isGoodDog === true)
      setPups(goodDogs)
    } else {
      getPups()
    }
    setFilterToggle(!filterToggle)
  }


  useEffect(getPups, [])

  let pupSpans = pups.map(p => <span key={p.id} onClick={onPupClick}>{p.name}</span>)

  let pupInfo = featPup ? <div id={featPup.id}><img src={featPup.image} alt={featPup.className} /><h2>{featPup.name}</h2> <button onClick={onGoodBad}>{featPup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button></div> : null

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={onFilterClick} id="good-dog-filter">Filter good dogs: {filterToggle ? "ON" : "OFF"}</button>
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
