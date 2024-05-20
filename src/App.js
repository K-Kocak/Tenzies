import './App.css';
import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"

function App() {

  // setting our states
  const [dice, setDice] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)

  // if all dice are held & they are all the same value, set tenzies to true
  // this is called every time the state of a dice changes (like clicking on a button)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)

    }
  }, [dice])

  // remakes a die with a new value
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // this is called when a die is clicked, it goes through all the dice
  // and when it finds the one that has an id equal to the one we clicked,
  // it reverses its "itHeld" state
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  // generates all the dice anew
  function allNewDice() {
    const newDice = []
    for(let i = 0; i< 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  // for every dice that isnt held, it runs generatedNewDie, else die remains the same
  // if tenzies is true though, aka you had won, then it sets tenzies to false and starts
  // a new round.
  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }   
  }

  // this essentially makes our 10 die on the screen using our imported Die.js component
  const diceElements = dice.map(die => <Die key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}/>)

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
      {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}</button>
    </main>
    )
}

export default App;
