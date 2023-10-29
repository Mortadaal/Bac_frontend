import {  useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Products } from '../models/products';
import NavBar from './NavBar';
import ProductDashboard from '../../features/dashboard/ProductDashboard';
import BookingVipRoomComponent from '../../features/dashboard/BookingVipRoomDashboard';


function App() {
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  
  
  function handleSelectProduct(id: number) {
    setSelectedProduct(products.find(x => x.id === id));
  }

  function handleCancleProduct() {
    setSelectedProduct(undefined);
  }
  function handleFormOpen(id?: number) {
    id ? handleSelectProduct(id) : handleCancleProduct();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  useEffect(() => {
    axios.get<Products[]>('http://localhost:5000/api/products').then(response => {
      setProducts(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ProductDashboard products={products}
        selectedProduct={selectedProduct}
        selectProduct={handleSelectProduct}
        cancelSelectProduct={handleCancleProduct}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}

        />
      </Container>
    </>
  )
}

export default App
