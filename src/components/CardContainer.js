import React, { useState } from 'react'
import Card from './Card'
import Loading from './Loading'
import Dealing from './Dealing'
import NextCard from './NextCard'

const CardContainer = ({ people, starships, newGame }) => {
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})
  const [currentGame, setCurrentGame] = useState()

  const sampleCard = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const checkResult = (option) => {
    let player1Result = parseInt(player1Card[option].replace(/,/g, ''))
    let player2Result = parseInt(player2Card[option].replace(/,/g, ''))
  }

  const getCard = (choice) => {
    return (choice === 'people' ? sampleCard(people) : sampleCard(starships))
  }

  const newCards = () => {
    setPlayer1Card(getCard(currentGame))
    setPlayer2Card(getCard(currentGame))
  }

  const handleClick = (option) => {
    newGame(option)
    setCurrentGame(option)
  }

  const LazyComponent = (condition, component) => condition ? component : <Loading />
  const DealingLoading = (condition, component) => condition ? component : <Dealing />

  return <>
    <div class='row'>
      <div class='col-sm-6'>
        {LazyComponent(player1Card, <Card card={player1Card} checkResult={checkResult} />)}
      </div>
      <div class='col-sm-6'>
        {LazyComponent(player2Card, <Card card={player2Card} checkResult={checkResult} />)}
      </div>
    </div>
    {(player1Card.name && player2Card.name) && <NextCard newCards={newCards} /> }
    <p>New Game?</p>
    <button type='button' id='new-char-btn' class='btn btn-primary' onClick={() => handleClick('people')}>Characters</button>
    <button type='button' id='new-star-btn' class='btn btn-success' onClick={() => handleClick('starships')}>Starships</button>
       </>
}

export default CardContainer
