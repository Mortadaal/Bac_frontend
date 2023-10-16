import { Button, Icon, Item, Label, Menu, Segment } from "semantic-ui-react";
import { Products } from "../../app/models/products"


interface Props{
    products:Products[];
}

export default function ProductList({products}:Props){
    return(
        <><Menu>
            <Menu.Item
                name='VandPiber' />
            <Menu.Item
                name='Kolde Drikke'
               // active={activeItem === 'jobs'}
               // onClick={this.handleItemClick} 
               />
            <Menu.Item
                name='Varme Drikke'
                //active={activeItem === 'locations'}
                //onClick={this.handleItemClick} 
                />
                <Menu.Item
                name='Snacks'
                //active={activeItem === 'locations'}
                //onClick={this.handleItemClick} 
                />
        </Menu>
        <Segment>
                <Item.Group divided>
                    {products.map(products => (
                        <Item key={products.id}>
                            <Item.Content>
                                <Item.Header as='a'>
                                    {products.productName}
                                </Item.Header>
                                <Item.Description>
                                    <div>{products.productDescription}</div>
                                    <div>{products.productPrice} Dkk</div>
                                </Item.Description>
                                <Button floated='right' color="green" icon="add circle"></Button>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment></>
    )
}