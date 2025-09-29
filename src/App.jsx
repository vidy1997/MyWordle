import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board  from './Components/Board/Board'
import Keyboard from './Components/KeyBoard/Keyboard'
import Timer from './Components/TimerTest/Timer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div>
<h1 className="robotoCondensed text-3xl font-bold">
  Hello with Roboto Condensed
</h1>
      <Board size={{rows:6, columns:5}} mode="light" boardData=""/>
      <br></br>
      <Keyboard/>

      {/* <Timer/> */}

       </div>
    </>
  )
}

export default App
