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
  const [player1Score, updatePlayer1Score] = useState(10)
  const [player2Score, updatePlayer2Score] = useState(10)
  const [end, toggleEnd] = useState(false)
  const [turns, updateTurns] = useState(0)

  const checkEnd = () => {
    if ((player1Score < 1) || player2Score < 1) {
      changeResult('End of game!')
      toggleEnd(true)
    }
  }

  useEffect(() => {
    checkEnd()
  })

  const newGame = (option) => {
    option === 'people' ? API.getPeople(updatePeople) : API.getStarships(updateStarships)
  }

  const updateScore = (p1, p2) => {
    updatePlayer1Score((player1Score + p1))
    updatePlayer2Score((player2Score + p2))
  }

  const handleResult = (p1, p2, cardLogic) => {
    updateTurns(+1)
    if (p1 > p2) {
      updateScore(1, -1)
      changeResult('Victory!')
      cardLogic('victory')
    } else if (p1 < p2) {
      updateScore(-1, 1)
      changeResult('You Lose!')
      cardLogic('loss')
    } else if (p1 === p2) {
      changeResult('Hmm a draw!')
      cardLogic('draw')
    }
  }

  const people = allPeople.filter(person => (person.name && ((person.height !== 'unknown') && (person.mass !== 'unknown'))))
  const starships = allStarships.filter(starship => (starship.name && ((starship.length !== 'unknown') && (starship.crew !== 'unknown'))))

  return (<>
    <Header />
    {!end &&
    <CardContainer people={people} starships={starships} updateScore={updateScore} newGame={newGame} handleResult={handleResult} />
    }
    <Result lastResult={lastResult} />
    {lastResult && <Score player1Score={player1Score} player2Score={player2Score} turns={turns}/> }
      </>
  )
}

export default App
