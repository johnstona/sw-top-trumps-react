import React from 'react'

const Card = ({ card, playerCard, toggleShow }) => {
  return <div class='card'>
    <div class='content'>
      <div class='header'>
        {card.name}
      </div>
      {playerCard && <button onClick={toggleShow}>Test</button>}
    </div>
  </div>
}

export default Card
