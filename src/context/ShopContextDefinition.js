import { createContext } from 'react'

export const ShopContext = createContext({
  products: [],
  currency: '$',
  delivery_fee: 0,
  cartItems: {},
  cartCount: 0,
  orders: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  addOrder: () => {},
  clearCart: () => {},
})
