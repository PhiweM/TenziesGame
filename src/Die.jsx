import React from 'react'

function Die(props) {
  return (
    <div 
      className='die' 
      style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}
      onClick={props.holdDice}
    > 
      {props.number} 
    </div>
  )
}

export default Die