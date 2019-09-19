import React from 'react'

const NextCard = ({ newCards, toggleShow }) => {
  const handleClick = () => {
    newCards()
    toggleShow()
  }
  return <button type='button' class='btn btn-primary' onClick={() => handleClick()}>Next Card</button>
}

export default NextCard