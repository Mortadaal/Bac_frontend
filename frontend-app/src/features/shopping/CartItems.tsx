

import { useShoppingCart } from "./ShoppingCartContext"
import { formatCurrency } from "../../utilities/formatCurrency"
import { useStore } from "../../app/stores/store"
import { Button } from "semantic-ui-react"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const {productStore}=useStore()
    const{productById}=productStore

  const { removeCartQuantity } = useShoppingCart()
  const item = productById.find(i => i.id === id)
  if (item == null) return null

    

  return (
    <div className="ui items">
    
      <div className="item" key={item.id}>
        <div className="ui small image">
          <img src={item.imageUrl} alt={item.imageUrl} />
        </div>
        <div className="content">
          <div className="header">{item.productName}</div>
          <div className="meta">
            <span className="price">{formatCurrency(item.productPrice * quantity)}</span>
            <span className="quantity"> x {quantity} </span>
          </div>

          <Button negative content='Fjern' onClick={() => removeCartQuantity(item.id)}
      />
          
        </div>
      </div>
    
  </div>
  )
}