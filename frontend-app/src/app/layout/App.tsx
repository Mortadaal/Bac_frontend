import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Products } from '../models/products';
import NavBar from './NavBar';
import ProductDashboard from '../../features/dashboard/ProductDashboard';
import { Category } from '../models/category';
import agent from '../api/agen';
import LoadingComponent from './LoadingComponent';


function App() {
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [category, setCategorys] = useState<Category[]>([]);
  const [loading,setLoading] =useState(true);
  const [submitting,setSubmitting] =useState(false);


  function handleSelectProduct(id: number) {
    setSelectedProduct(products.find(x => x.id === id));
  }

  function handleFormOpen(id?: number) {
    id ? handleSelectProduct(id) : null;
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  useEffect(() => {
    agent.Products.list().then(response => {
      setProducts(response);
      setLoading(false)
    })
  }, [])
  useEffect(() => {
   agent.Categorys.list().then(response => {
      setCategorys(response)
    })
  }, [])

  function handleCreateOrEditProduct(product: Products) {
    setSubmitting(true);
    if(product.id){
      agent.Products.update(product).then(()=>{
        setProducts([...products.filter(x => x.id !== product.id), product])
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      })
      }else{
        product.id=product.id;
        agent.Products.create(product).then(()=>{
          setProducts([...products,product])
          setSelectedProduct(product);
          setEditMode(false);
          setSubmitting(false)
        })
    }
   

  }

  function handleDeleteProduct(id:number) {
    setProducts([...products.filter(x=>x.id!==id)])
  }

  function handleDeleteCategory(id:number) {
    setCategorys([...category.filter(x=>x.id!== id)])
  }

  if(loading) return <LoadingComponent content='Indlæser Hjemmeside'/>
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ProductDashboard
          products={products}
          selectedProduct={selectedProduct}
          selectProduct={handleSelectProduct}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          category={category}
          createOrEdit={handleCreateOrEditProduct}
          deleteProduct={handleDeleteProduct}
          deleteCategory={handleDeleteCategory}
          submitting={submitting}
        />

      </Container>

    </>
  )
}

export default App
