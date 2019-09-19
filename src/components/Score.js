import React from 'react'

const Score = ({player1Score, player2Score}) => {
  return <> 
        <h3>Your Score: {player1Score}</h3>
        <h3>Opponent Score: {player2Score}</h3>
        </>
}

export default Score