import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter,setCounter] = useState(15)
  // let counter = 5

  const addValue =() => {
    // counter =counter + 1
    if(counter<20){

      setCounter(counter + 1)
    } else{
      alert("Cant add after 20")
    }
  
  } 
  
  const removeValue = () => {
    if(counter < 1){

      alert("cant decrease the value")
    }
    else{
      setCounter(counter - 1)
    }
  
  }

  return (
    <>
      <h1>Chai and react</h1>
      <h2>Counter value: {counter} </h2>

      <button
      onClick={addValue}>Add Value{counter}</button>
      <br/>
      <button
      onClick={removeValue}
      >Remove Value {counter} </button>
    </>
  )
}

export default App
