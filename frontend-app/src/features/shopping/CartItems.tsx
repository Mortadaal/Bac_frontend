import { formatCurrency } from "../../utilities/formatCurrency";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Item, Segment } from "semantic-ui-react";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { productStore, shopCartStore } = useStore();
  const { productById } = productStore;
  const { decreaseCartQuantity } = shopCartStore;
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
                  {formatCurrency(item.productPrice * quantity)}
                </span>
                <span className="quantity"> x {quantity} </span>
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
