import { useReducer } from 'react';
import { cartReducer, initialCartState } from '../reducers/cartReducer';

const products = [
  { id: 1, name: 'Sneakers', price: 5000, quantity: 1 },
  { id: 2, name: 'Smartphone', price: 40000, quantity: 1 },
  { id: 3, name: 'Laptop', price: 50000, quantity: 1 },
]

const ShoppingCart = () => {

const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState)

const addItemToCart = (item) => {
  dispatchCartAction({ type: 'ADD', item: item })
}

const removeItemFromCart = (item) => {
  dispatchCartAction({ type: 'REMOVE', item: item })
}

  return (
    <div>
      <h2> Shopping Cart </h2>
      {/* Render cart items */}
      {
        cartState.items.map(item => {
          return (
            <div key={item.id}>
              <span>{item.name}</span>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => removeItemFromCart(item)}>Remove</button>
            </div>
          )
        })
      } 
      <div>Total Amount: { cartState.totalAmount.toFixed(2) }</div>
      <div>
        <h2>Products List</h2>
        <div>
          { 
            products.map(product => {
              return (
                <div key={product.id}>
                  <span>{product.name}</span> - <span>{product.price}</span>
                  <button onClick={() => addItemToCart(product)}>Add to Cart</button>
                </div>
              )
            }) 
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart;
