import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './components/Chat/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Chat></Chat>
    </>
  )
}

export default App
