import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Header from '../components/Header';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <h1>Ciao sono la Home per i tuoi Film</h1>
    </>
  )
}

export default App
