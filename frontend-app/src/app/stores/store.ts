import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import CategoryStore from "./categoryStore";
import ShopCartStore from "./shopCartStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";




interface Store{
    productStore:ProductStore
    categoryStore:CategoryStore
    shopCartStore:ShopCartStore
    userStore:UserStore
    commonStore: CommonStore
   
}
export const store:Store={
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    shopCartStore:new ShopCartStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),

}
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}