import { useEffect} from 'react'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ProductDashboard from '../../features/dashboard/ProductDashboard';


import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';




function App() {
 const {productStore,categoryStore}=useStore();


  useEffect(() => {
   productStore.loadProducts();
  }, [productStore])

  useEffect(() => {
    categoryStore.loadCategorys();
   }, [categoryStore])
 
  

  if(productStore.loadingInitial) return <LoadingComponent content='Indlæser Hjemmeside'/>
  return (
    <>
      <NavBar  />
      <Container style={{ marginTop: '7em' }}>
        <ProductDashboard/>

      </Container>

    </>
  )
}

export default observer(App);
