import React, { useEffect, useState } from 'react'
import './App.css'
import API from './adapters/API'
import CardContainer from './components/CardContainer'

function App () {
  const [allPeople, updatePeople] = useState([])
  const [allStarships, updateStarships] = useState([])
  const [lastResult, changeResult] = useState('Start a new game')
  const [player1Score, updatePlayer1Score] = useState(0)
  const [player2Score, updatePlayer2Score] = useState(0)

  const newGame = (option, callback) => {
    option === 'people' ? API.getPeople(updatePeople) : API.getStarships(updateStarships)
  }

  const updateScore = (p1, p2) => {
    updatePlayer1Score((player1Score + p1))
    updatePlayer2Score((player2Score + p2))
  }

  const people = allPeople.filter(person => (person.name && ((person.height !== 'unknown') && (person.mass !== 'unknown'))))
  const starships = allStarships.filter(starship => (starship.name && ((starship.length !== 'unknown') && (starship.crew !== 'unknown'))))

  return (<>
    {/* <Header /> */}
    <CardContainer people={people} starships={starships} updateScore={updateScore} newGame={newGame} />
    {/* <Result lastResult={lastResult} changeResult={changeResult}/>
    <Score player1Score={player1Score} player2Score={player2Score}/> */}
      </>
  )
}

export default App
