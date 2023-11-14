// ShoppingCart.tsx

import React from "react";
import { Card, Item } from "semantic-ui-react";
import { useShoppingCart } from "./ShoppingCartContext";
import { CartItem } from "./CartItems";

export default function ShoppingCart() {
  const { cartItems } = useShoppingCart();

  return (
    <Card>
      <Card.Header>
        <h2> Cart</h2>
      </Card.Header>
      <Card.Content>
        <Item.Group divided>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Item.Group>
      </Card.Content>
    </Card>
  );
}
