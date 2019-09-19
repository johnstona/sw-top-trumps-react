import React, { useState } from 'react'
import Card from './Card'
import Loading from './Loading'
import Dealing from './Dealing'
import NextCard from './NextCard'

const CardContainer = ({ people, starships, newGame, handleResult }) => {
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})
  const [currentGame, setCurrentGame] = useState()
  const [show, toggleShow] = useState(false)
  const [game, toggleGame] = useState(false)

  let option1
  let option2

  if (currentGame === 'people') {
    option1 = 'mass'
    option2 = 'height'
  } else {
    option1 = 'length'
    option2 = 'crew'
  }

  const sampleCard = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const checkResult = (option) => {
    let player1Result = parseInt(player1Card[option].replace(/,/g, ''))
    let player2Result = parseInt(player2Card[option].replace(/,/g, ''))
    handleResult(player1Result, player2Result)
  }

  const getCard = (choice) => {
    return (choice === 'people' ? sampleCard(people) : sampleCard(starships))
  }

  const newCards = () => {
    setPlayer1Card(getCard(currentGame))
    setPlayer2Card(getCard(currentGame))
  }

  const handleClick = (option) => {
    newGame(option, newCards)
    setCurrentGame(option)
    toggleGame(true)
  }

  const handleStart = () => {
    newCards()
    toggleGame(false)
  }

  const options = [option1, option2]

  // const LazyComponent = (condition, component) => condition ? component : <Loading />

  return <>
    <div>
      {!currentGame ? <p>New Game - select type</p> : `${currentGame} game!`}
    </div>
    <div class='row'>
      <div class='col-sm-6'>
        {player1Card.name && <Card card={player1Card} options={options} checkResult={checkResult} show={show} playerCard toggleShow={() => toggleShow(!show)} />}
      </div>
      <div class='col-sm-6'>
        {player2Card.name && (show ? <Card card={player2Card} options={options} /> : null)}
      </div>
    </div>
    <div>
      {(people.length || starships.length) ? (show && <NextCard newCards={newCards} toggleShow={() => toggleShow(!show)} />) : (currentGame ? <Dealing /> : null)}
      {(game && (people.length || starships.length)) ? <button type='button' id='first-card-btn' class='btn btn-primary' onClick={() => handleStart()}>Deal First Card</button> : null}
    </div>
    {!currentGame &&
    <>
      <button type='button' id='new-char-btn' class='btn btn-primary' onClick={() => handleClick('people')}>Characters</button>
      <button type='button' id='new-star-btn' class='btn btn-success' onClick={() => handleClick('starships')}>Starships</button>
    </>
    }
       </>
}

export default CardContainer
