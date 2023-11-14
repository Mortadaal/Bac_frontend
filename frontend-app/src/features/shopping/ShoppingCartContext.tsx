import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "./ShoppingCart";



type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeCartQuantity: (id: number) => void
    cartQuantity:number
    cartItems:CartItem[]
    openCart:()=>void
    closeCart:()=>void

}
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const[isOpen,setIsOpen]=useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity=cartItems.reduce((quantity,items)=>items.quantity+quantity,0)

    const openCart=()=>setIsOpen(true)
    const closeCart=()=>setIsOpen(false)
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeCartQuantity(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, 
        removeCartQuantity,cartItems,cartQuantity,openCart,closeCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}