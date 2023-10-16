import {  useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Products } from '../models/products';
import NavBar from './NavBar';
import ProductDashboard from '../../features/dashboard/ProductDashboard';

function App() {
  const [products, setUsers] = useState<Products[]>([]);
  useEffect(() => {
    axios.get<Products[]>('http://localhost:5000/api/products').then(response => {
      setUsers(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ProductDashboard products={products}/>
      </Container>
     

    </>
  )
}

export default App
