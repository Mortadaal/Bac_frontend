
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import { Category } from "../../app/models/category";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  products: Products[];

}

export default function ProductList({ products }: Props) {
  const [category, setCategorys] = useState<Category[]>([]);

  useEffect(() => {
    axios.get<Category[]>('http://localhost:5000/api/category').then(response => {
      setCategorys(response.data)
    })
  }, [])
  return (
    <>

      <Menu>
        {category && category.map((category, index) => (
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
                    <img src="assets/Æble.jpg" alt="img" width="100px" height="100px" />
                  </Item.Image>
                  <Item.Header as='a'>
                    {product.productName}
                  </Item.Header>
                  <Item.Description>
                    <div>{product.productDescription}</div>
                    <div>  {formatCurrency(product.productPrice)}</div>
                  </Item.Description>
                  <Button floated='right' color="green" icon="add circle"></Button>
                  <Button floated='right' color="grey" icon="edit"></Button>
                </Item.Content>
              </Item>
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    </>
  );
}