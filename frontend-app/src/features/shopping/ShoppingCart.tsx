import { Button, Grid, List, Segment } from "semantic-ui-react";
import { CartItem } from "./CartItems";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ShoppingCart() {
  const { shopCartStore, productStore } = useStore();
  const { cartItems } = shopCartStore;
  const handleSetOrder = () => {
    const orderlist = cartItems.map((cartItem) => {
      const { id, quantity } = cartItem;
      const item = productStore.productById.find((i) => i.id === id);

      return {
        productName: item?.productName,
        quantity,
        totalPrice: item ? item.productPrice * quantity : 0,
      };
    });

    console.log("Cart OrderList:", orderlist);
  };
  return (
    <Segment>
      <Grid.Column columns={2}>
        <List>
          <List.Header>
            <h2>Cart</h2>
          </List.Header>
          <List.Item>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </List.Item>
        </List>
        <Button positive onClick={handleSetOrder}>
          Afslut Ordre
        </Button>
      </Grid.Column>
    </Segment>
  );
});
