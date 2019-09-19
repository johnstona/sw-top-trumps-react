import React, { useEffect, useState } from 'react'
import './App.css'
import API from './adapters/API'
import CardContainer from './components/CardContainer'
import Header from './components/Header'
import Result from './components/Result'
import Score from './components/Score'

function App () {
  const [allPeople, updatePeople] = useState([])
  const [allStarships, updateStarships] = useState([])
  const [lastResult, changeResult] = useState()
  const [player1Score, updatePlayer1Score] = useState(0)
  const [player2Score, updatePlayer2Score] = useState(0)

  const newGame = (option, callback) => {
    option === 'people' ? API.getPeople(updatePeople) : API.getStarships(updateStarships)
  }

  const updateScore = (p1, p2) => {
    updatePlayer1Score((player1Score + p1))
    updatePlayer2Score((player2Score + p2))
  }

  const handleResult = (p1, p2) => {
    if (p1 > p2) {
      updateScore(1, 0)
      changeResult('Victory!')
    } else if (p1 < p2) {
      updateScore(0, 1)
      changeResult('You Lose!')
    } else if (p1 === p2) {
      changeResult('Hmm a draw!')
    }
  }

  const people = allPeople.filter(person => (person.name && ((person.height !== 'unknown') && (person.mass !== 'unknown'))))
  const starships = allStarships.filter(starship => (starship.name && ((starship.length !== 'unknown') && (starship.crew !== 'unknown'))))

  return (<>
    <Header />
    <CardContainer people={people} starships={starships} updateScore={updateScore} newGame={newGame} handleResult={handleResult} />
    <Result lastResult={lastResult} />
  {lastResult && <Score player1Score={player1Score} player2Score={player2Score}/> }
      </>
  )
}

export default App
