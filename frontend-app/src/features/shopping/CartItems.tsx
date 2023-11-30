import { formatCurrency } from "../../utilities/formatCurrency";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Item, Segment } from "semantic-ui-react";

type CartItemProps = {
  id: number;
};

export function CartItem({ id }: CartItemProps) {
  const { productStore, shopCartStore } = useStore();
  const { productById } = productStore;
  const { decreaseCartQuantity, getItemQuantity } = shopCartStore;
  const item = productById.find((i) => i.id === id);

  if (item == null) return null;

  return (
    <Segment>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={4}>
            <Item.Image src={item.imageUrl} alt={item.imageUrl} size="small" />
          </Grid.Column>
          <Grid.Column width={8}>
            <div>
              <div>{item.productName}</div>
              <div>
                <span className="price">
                  {formatCurrency(item.productPrice * getItemQuantity(item.id))}
                </span>
                <span className="quantity"> x {getItemQuantity(item.id)} </span>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              negative
              icon="minus"
              onClick={() => decreaseCartQuantity(item.id)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export function CartSummary() {
  const { shopCartStore } = useStore();
  const { cartItems } = shopCartStore;
  const { productStore } = useStore();

  const totalCartPrice = cartItems.reduce((total, item) => {
    const product = productStore.productById.find((i) => i.id === item.id);
    if (product) {
      total += product.productPrice * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div>
      <h2>Total Price: {formatCurrency(totalCartPrice)}</h2>
    </div>
  );
}
