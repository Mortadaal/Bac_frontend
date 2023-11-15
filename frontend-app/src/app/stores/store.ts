import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import CategoryStore from "./categoryStore";
import ShopCartStore from "./shopCartStore";
import QRCodeStore from "./qrCodeStore";




interface Store{
    productStore:ProductStore
    categoryStore:CategoryStore
    shopCartStore:ShopCartStore
    qrCodeStore:QRCodeStore
   
}
export const store:Store={
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    shopCartStore:new ShopCartStore(),
    qrCodeStore: new QRCodeStore(),

}
export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}