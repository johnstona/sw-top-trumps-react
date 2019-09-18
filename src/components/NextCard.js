import React from 'react'

const NextCard = ({newCards}) => {
  return <button type='button' class='btn btn-primary' onClick={() => newCards()}>Next Card</button>
}

export default NextCard