import React from 'react'

const Card = ({ card, playerCard, toggleShow, show, options, checkResult }) => {
 
  const handleClick = (option) => {
    checkResult(option)
    toggleShow()
  }
  return <div class='card'>
    <div class='content'>
      <div class='header'>
        {card.name}
      </div>
      <div>
        <p>{options[0]}: {card[options[0]]}
          {(playerCard && !show) && <button onClick={() => handleClick(options[0])}>choose</button>}
        </p>
      </div>
      <div>
        <p>{options[1]}: {card[options[1]]}
          {(playerCard && !show) && <button onClick={() => handleClick(options[1])}>choose</button>}
        </p>
      </div>
    </div>
  </div>
}

export default Card
