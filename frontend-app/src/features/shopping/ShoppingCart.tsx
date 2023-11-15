
import { Item } from "semantic-ui-react";
import { CartItem } from "./CartItems";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer( function ShoppingCart() {
  const { shopCartStore } = useStore();
  const { cartItems } = shopCartStore;

  return (
    <div>
      <div >
        <h2 > Cart</h2>
      </div>
      <div>
        <Item>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Item>
      </div>
    </div>
  );
})
