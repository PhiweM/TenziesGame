import { useState, useEffect} from 'react';
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)


//Function generates new single object w random Num
function generateNewDie() {
  return {
      number: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id:nanoid()
    }
}

//function generates new objects at beginning. 
  function allNewDice() {
    const newDie = []
    for(let i =0; i < 10; i++) {
      newDie.push(generateNewDie() );
    }
    return newDie
  }

  //generates new set of numbers while keeping the selected held
  function rollDice() {
    if(tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
  }


// Flips is held for the dice
function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? {...die, isHeld:!die.isHeld} : die
  }))
}

//function to check if Game is won
useEffect(() => {
  const allHeld= dice.every(die => die.isHeld)
  const allSameValue = dice.every(die => die.value === dice[0].value)

  if(allHeld && allSameValue) {
    setTenzies(true)
  }
}, [dice])

const diceElements = dice.map((die,index) => {
    return <Die  
              number={die.number} 
              key={die.id}
              isHeld={die.isHeld}
              holdDice={() =>holdDice(die.id)}
              />
  })

   return (
    <div className="body">
      <main className="main">
       {tenzies && <Confetti />}
        <h1 className="tenzies">Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

    
        <div className='dice'>
          {diceElements}
        </div>

        <button className='btn shadow__btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  )
}

