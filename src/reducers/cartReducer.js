/* eslint-disable no-case-declarations */


// const [count, setCount] = useState(1)

export const initialCartState = {
  items: [], // array of items in the cart
  totalAmount: 0
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Check if the item is already in the cart
      // If yes, update the quantity
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems;

      if (existingCartItem) {
        // If the item is already in the cart, update the quantity
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        // If item is not in the cart, add as new
        updatedItems = state.items.concat(action.item)
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price
      }

    case 'REMOVE':
      const currentCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
      const currentCartItem = state.items[currentCartItemIndex]

      let updatedRemoveItems;

      if (currentCartItem.quantity === 1) {
        // Remove item from the cart if only 1 quantity is left
        updatedRemoveItems = state.items.filter(item => item.id !== action.id)
      } else {
        // Decrease the quantity
        const updatedItem = { ...currentCartItem, quantity: currentCartItem.quantity - 1 };
        updatedRemoveItems[currentCartItemIndex] = updatedItem
      }

      return {
        items: updatedRemoveItems,
        totalAmount: state.totalAmount - currentCartItem.price
      }
  
    default:
      return state;
  }
}