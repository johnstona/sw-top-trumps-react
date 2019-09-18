import React from 'react'

const Card = ({ card }) => {
  return <div class='card'>
    <div class='content'>
      <div class='header'>
        {card.name}
      </div>
    </div>
  </div>
}

export default Card
