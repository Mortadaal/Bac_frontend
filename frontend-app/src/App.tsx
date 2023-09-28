import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/api/users').then(response=>{
      setUsers(response.data)
    })
  },[])

  return (
    <h1>The Duse Cafe</h1>
  )
}

export default App
