import { Button, Grid, List, Segment } from "semantic-ui-react";
import { CartItem } from "./CartItems";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Order, OrderWithTableNumber } from "../../app/models/orderlist";
import agent from "../../app/api/agen";


export default observer(function ShoppingCart() {
  const { shopCartStore, productStore} = useStore();
  const { cartItems } = shopCartStore;

  const handleSetOrder = async () => {
    const tableNumber = localStorage.getItem('tablenumber');
  
    const orderItems: Order[] = cartItems.map((cartItem) => {
      const { id, quantity } = cartItem;
      const item = productStore.productById.find((i) => i.id === id);
  
      return {
        productName: item?.productName,
        quantity,
        totalPrice: item ? item.productPrice * quantity : 0,
      };
    });
  
    const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
    const orderWithTableNumber: OrderWithTableNumber = {
     
      tableNumber,
      orderItems,
      totalPrice: totalPrice,
    };
    agent.Order.create(orderWithTableNumber);
    console.log("Order with Table Number:", orderWithTableNumber);
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
