import { action, computed, makeObservable, observable } from "mobx";
import { CartItem } from "../../features/shopping/CartItems";

export interface CartItem {
    id: number;
    quantity: number;
  }

export default class ShopCartStore{
    cartItems: CartItem[] = [];
    constructor() {
        makeObservable(this, {
          cartItems: observable,
          cartQuantity: computed,
          getItemQuantity: action,
          increaseCartQuantity: action,
          decreaseCartQuantity: action,
          removeCartQuantity: action,
        });
      }

      get cartQuantity(): number {
        return this.cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
      }
      getItemQuantity = (id: number): number => {
        return this.cartItems.find((item) => item.id === id)?.quantity || 0;
      };

      increaseCartQuantity = (id: number) => {
        const existingItem = this.cartItems.find((item) => item.id === id);
        if (!existingItem) {
          this.cartItems.push({ id, quantity: 1 });
        } else {
          existingItem.quantity += 1;
        }
      };

    decreaseCartQuantity = (id: number) => {
    const existingItem = this.cartItems.find((item) => item.id === id);
    if (existingItem?.quantity === 1) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    } else if (existingItem) {
      existingItem.quantity -= 1;
    }
  };

    removeCartQuantity = (id: number) => {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  };
}




