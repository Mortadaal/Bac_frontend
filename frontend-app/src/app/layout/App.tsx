import {  useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Products } from '../models/products';
import NavBar from './NavBar';
import ProductDashboard from '../../features/dashboard/ProductDashboard';
import RegisterForm from '../../features/user/RegisterForm';
import { Category } from '../models/category';


function App() {
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  const [category, setCategorys] = useState<Category[]|Category>([]);
  
  
  function handleSelectProduct(id: number) {
    setSelectedProduct(products.find(x => x.id === id));
  }
  
  function handleFormOpen(id?: number) {
    id ? handleSelectProduct(id):null;
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
  useEffect(() => {
    axios.get<Category[]|Category>('http://localhost:5000/api/category').then(response => {
      setCategorys(response.data)
    })
  }, [])


  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop:'7em'}}>
        <ProductDashboard
         products={products}
        selectedProduct={selectedProduct}
        selectProduct={handleSelectProduct}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        category={category}

        />
        
      </Container>
      
    </>
  )
}

export default App
