import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import CategoryStore from "./categoryStore";
import ShopCartStore from "./shopCartStore";


interface Store{
    productStore:ProductStore
    categoryStore:CategoryStore
    shopCartStore:ShopCartStore
}
export const store:Store={
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    shopCartStore:new ShopCartStore(),
}
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}