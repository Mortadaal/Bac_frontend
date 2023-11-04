
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import { Category } from "../../app/models/category";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  products: Products[];
  category:Category[]|Category;
  openForm: (id: number) => void;

}

export default function ProductList({ products, openForm ,category}: Props) {
  const categoryArray = Array.isArray(category) ? category : [category];
  return (
    <>
      <Menu>
        {categoryArray && categoryArray.map((category, index) => (
          <Menu.Item key={index}>
            {category.categoryName}

          </Menu.Item>
        ))}
        <Button positive content="Add New Category" />
      </Menu>

      <Segment>

        <Grid stackable columns={2}>
          {products.map((product) => (
            <Grid.Column key={product.id}>
              <Item>
                <Item.Content>
                  <Item.Image>
                    <img src={product.imageUrl} alt="img" width="100px" height="100px" />
                  </Item.Image>
                  <Item.Header as='a'>
                    {product.productName}
                  </Item.Header>
                  <Item.Description>
                    <div>{product.productDescription}</div>
                    <div>  {formatCurrency(product.productPrice)}</div>
                  </Item.Description>
                  <Button floated='right' circular color='green' icon='add'></Button>
                  <Button onClick={() => openForm(product.id)} floated='right' color='grey' icon='edit'></Button>
                </Item.Content>
              </Item>
            </Grid.Column>
          ))}
        </Grid>
      </Segment>

      <Menu>
        {categoryArray && categoryArray.map((category, index) => (
          <Menu.Item key={index}>
            {category.categoryName}

          </Menu.Item>
        ))}
        <Button positive content="Add New Category" />
      </Menu>
    </>
  );
}