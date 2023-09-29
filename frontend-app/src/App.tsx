import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header,List} from 'semantic-ui-react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then(response => {
      setUsers(response.data)
    })
  }, [])

  return (
    <div>
<Header as='h2' icon='coffee' content='The Duse Cafe'/>
      
      <List>
        {users.map((user: any) => (
          <List.Item key={user.userId}>{user.userName}</List.Item>
        ))}
      </List>

    </div>
  )
}

export default App
