import React, { useState } from 'react'
import Card from './Card'

const CardContainer = ({ people, starships }) => {
  const [player1Card, setPlayer1Card] = useState({})
  const [player2Card, setPlayer2Card] = useState({})

  const sampleCard = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const checkResult = (option) => {
    let player1Result = parseInt(player1Card[option].replace(/,/g, ''))
    let player2Result = parseInt(player2Card[option].replace(/,/g, ''))
  }

  const getCard = (choice) => {
    return (choice === 'person' ? sampleCard(people) : sampleCard(starships))
  }

  const newCards = (choice) => {
    setPlayer1Card(getCard(choice))
    setPlayer2Card(getCard(choice))
  }

  return <>
    <div class='row'>
      <div class='col-sm-6'>
        <Card card={player1Card} checkResult={checkResult} />
      </div>
      <div class='col-sm-6'>
        <Card card={player2Card} checkResult={checkResult} />
      </div>
    </div>
    <p>New Game?</p>
    <button type='button' class='btn btn-primary' onClick={() => newCards('person')}>Characters</button>
    <button type='button' class='btn btn-success' onClick={() => newCards('starship')}>Starships</button>
       </>
}

export default CardContainer
