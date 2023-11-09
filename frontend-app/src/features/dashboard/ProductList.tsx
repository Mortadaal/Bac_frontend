import { Button, Grid, Item, Segment } from "semantic-ui-react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { SyntheticEvent, useState, useEffect } from "react"; // Import useEffect
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ProductList() {
  const { productStore, categoryStore } = useStore();
  const { openForm, deleteProduct, productById, loading } = productStore;
  const { categoryById} = categoryStore;

  const [target, setTarget] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (categoryById.length > 0) {
      setSelectedCategory(categoryById[0].id);
    }
  }, [categoryById]);

 
  const handleCategoryClick = (categoryId:number) => {
    setSelectedCategory(categoryId);
  };

  function handleProductDelete(e: SyntheticEvent<HTMLButtonElement>, id: number) {
    setTarget(e.currentTarget.name);
    deleteProduct(id);
  }

  const filteredProducts = selectedCategory
    ? productById.filter((product) => product.categoryId === selectedCategory)
    : productById;

  return (
    <>
      <Button onClick={() => productStore.openForm()} positive content="Add new Product" />
      <Button positive onClick={() => categoryStore.openCategoryForm()} content="Tilføj Kategori" />
      <Button negative onClick={() => categoryStore.openDeleteCategoryForm()} content="Slet Kategori" />

      <Segment>
        <Grid stackable columns={2}>
          {categoryById.map((category) => (
            <Button
              className={`ui pagination menu ${selectedCategory === category.id ? 'active' : ''}`}
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.categoryName}
            </Button>
          ))}

          {filteredProducts.map((product) => (
            <Grid.Column key={product.id}>
              <Item>
                <Item.Content>
                  <Item.Image>
                    <img src={product.imageUrl} alt="img" width="100px" height="100px" />
                  </Item.Image>
                  <Item.Header as="a">{product.productName}</Item.Header>
                  <Item.Description>
                    <div>{product.productDescription}</div>
                    <div>{formatCurrency(product.productPrice)}</div>
                  </Item.Description>

                  <Button floated="right" circular color="green" icon="add"></Button>
                  <Button floated="right" onClick={() => openForm(product.id)} color="grey" icon="edit"></Button>
                  <Button
                    name={product.id}
                    floated="left"
                    loading={loading && target === product.id.toString()}
                    onClick={(e) => handleProductDelete(e, product.id)}
                    color="red"
                    content="Delete"
                  ></Button>
                </Item.Content>
              </Item>
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    </>
  );
});
