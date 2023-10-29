
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { Products } from "../../app/models/products";
import { Category } from "../../app/models/category";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  products: Products[];
  selectProduct:(id:number)=>void;
  openForm:()=>void;
}

export default function ProductList({ products,selectProduct,openForm }: Props) {
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
        <Button onClick={(openForm)} positive content="Add new Product"/>
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
                  <Button floated='right'circular color="green" icon="add "></Button>
                  <Button onClick={()=>selectProduct(product.id)} floated='right' color="grey" icon="edit"></Button>
                </Item.Content>
              </Item>
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
      
      <Menu>
        {category && category.map((category, index) => (
          <Menu.Item key={index}>
            {category.categoryName}
            
          </Menu.Item>
        ))}
        <Button positive content="Add New Category" />
      </Menu>
    </>
  );
}