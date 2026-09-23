import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextDefinition'

const Cart = () => {
  const { cartItems, products, currency, delivery_fee, removeFromCart, updateQuantity } = useContext(ShopContext)
  const navigate = useNavigate()

  const cartEntries = Object.values(cartItems)

  if (!cartEntries.length) {
    return <div className="py-16 text-center text-gray-500">Your cart is empty.</div>
  }

  const items = cartEntries
    .map((entry) => {
      const product = products.find((item) => item._id === entry.itemId)

      if (!product) return null

      return {
        ...entry,
        product,
        lineTotal: product.price * entry.quantity,
      }
    })
    .filter(Boolean)

  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0)
  const total = subtotal + delivery_fee

  const handleCheckout = () => {
    navigate('/Placeorder', {
      state: {
        type: 'cart',
        items: items.map(({ itemId, size, quantity, product }) => ({
          id: itemId,
          name: product.name,
          image: product.image?.[0],
          size: size || 'N/A',
          price: product.price,
          quantity,
        })),
      },
    })
  }

  return (
    <div className="py-10">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.itemId}_${item.size}`} className="flex items-center gap-4 border border-gray-200 p-4">
              <img src={item.product.image[0]} alt={item.product.name} className="h-24 w-20 object-cover" />

              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="mt-1 text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
                <p className="mt-2 text-sm font-medium">{currency}{item.product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.itemId, item.size, -1)} className="h-8 w-8 cursor-pointer border">-</button>
                <span className="min-w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.itemId, item.size, 1)} className="h-8 w-8 cursor-pointer border">+</button>
              </div>

              <div className="w-24 text-right font-medium">
                {currency}{item.lineTotal}
              </div>

              <button onClick={() => removeFromCart(item.itemId, item.size)} className="cursor-pointer text-sm text-red-500">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Cart summary</h2>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency}{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>{currency}{delivery_fee}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>{currency}{total}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full cursor-pointer bg-black px-4 py-3 text-sm font-medium uppercase tracking-wide text-white"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart