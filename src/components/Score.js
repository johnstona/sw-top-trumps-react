import React from 'react'

const Score = ({player1Score, player2Score, turns}) => {
  return <> 
        <h3>Your Cards: {player1Score}</h3>
        <h3>Opponent Cards: {player2Score}</h3>
        <h4>Number of Turns: {turns}</h4>
        </>
}

export default Score