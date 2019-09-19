import React, { useState } from 'react'
import Card from './Card'
import Dealing from './Dealing'
import NextCard from './NextCard'

const CardContainer = ({ people, starships, newGame, handleResult }) => {
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})
  const [allPlayer1Cards, setAllPlayer1Cards] = useState([])
  const [allPlayer2Cards, setAllPlayer2Cards] = useState([])
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

  const dealCards = () => {
    let array
    if (currentGame === 'people') {
      array = people
    } else {
      array = starships
    }
    let times = 10
    for (let i = 0; i < times; i++) {
      let card1 = (sampleCard(array))
      let card2 = (sampleCard(array))
      allPlayer1Cards.push(card1)
      allPlayer2Cards.push(card2)
    }
    newCards()
  }

  const sampleCard = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const checkResult = (option) => {
    let player1Result = parseInt(player1Card[option].replace(/,/g, ''))
    let player2Result = parseInt(player2Card[option].replace(/,/g, ''))
    handleResult(player1Result, player2Result, cardLogic)
  }

  const cardLogic = (result) => {
    if (result === 'victory') {
      allPlayer1Cards.shift()
      allPlayer1Cards.push(player1Card, player2Card)
      allPlayer2Cards.shift()
    } else if (result === 'loss') {
      allPlayer2Cards.shift()
      allPlayer2Cards.push(player2Card, player1Card)
      allPlayer1Cards.shift()
    } else if (result === 'draw') {
      allPlayer1Cards.shift()
      allPlayer1Cards.push(player1Card)
      allPlayer2Cards.shift()
      allPlayer2Cards.push(player2Card)
    }
  }

  const newCards = () => {
    setPlayer1Card(allPlayer1Cards[0])
    setPlayer2Card(allPlayer2Cards[0])
  }

  const handleClick = (option) => {
    newGame(option, newCards)
    setCurrentGame(option)
    toggleGame(true)
  }

  const handleStart = () => {
    dealCards()
    toggleGame(false)
  }

  const options = [option1, option2]

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
