import { useContext, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextDefinition'
import { assets } from '../assets/assets'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { products, currency, delivery_fee, cartItems, addOrder, clearCart } = useContext(ShopContext)
  const [address, setAddress] = useState({
    pincode: '',
    city: '',
    state: '',
    area: '',
    landmark: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  const orderItems = useMemo(() => {
    if (state?.type === 'product' && state.product) {
      return [{
        id: state.product._id,
        name: state.product.name,
        image: state.product.image?.[0],
        size: state.size || state.product.sizes?.[0] || 'N/A',
        price: state.product.price,
        quantity: 1,
      }]
    }

    if (state?.type === 'cart' && Array.isArray(state.items)) {
      return state.items
    }

    const cartEntries = Object.values(cartItems)

    return cartEntries
      .map((entry) => {
        const product = products.find((item) => item._id === entry.itemId)

        if (!product) return null

        return {
          id: entry.itemId,
          name: product.name,
          image: product.image?.[0],
          size: entry.size || 'N/A',
          price: product.price,
          quantity: entry.quantity,
        }
      })
      .filter(Boolean)
  }, [cartItems, products, state])

  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const total = subtotal + delivery_fee
  const paymentMethods = [
    { name: 'Cash on Delivery', icon: '₹' },
    { name: 'UPI', icon: assets.razorpay_logo, image: true },
    { name: 'Card', icon: assets.stripe_logo, image: true },
    { name: 'Net Banking', icon: '▦' },
  ]

  const handlePlaceOrder = () => {
    if (Object.values(address).some((value) => !value.trim())) {
      alert('Please complete your delivery address before placing the order.')
      return
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      paymentMethod,
      total,
      items: orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryAddress: { ...address },
      createdAt: new Date().toISOString(),
    }

    addOrder(newOrder)
    clearCart()
    alert(`Order placed successfully via ${paymentMethod}.`)
    navigate('/Orders')
  }

  if (!orderItems.length) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-lg text-gray-600">No product selected for order.</p>
        <Link to="/Cart" className="cursor-pointer bg-black px-6 py-3 text-sm font-medium uppercase tracking-wide text-white">
          Go to cart
        </Link>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">Place order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-900">Delivery address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ['pincode', 'Pincode', 'Enter pincode'],
                ['city', 'City', 'Enter city'],
                ['state', 'State', 'Enter state'],
                ['area', 'Area', 'Enter area'],
                ['landmark', 'Landmark', 'Enter nearby landmark'],
              ].map(([field, label, placeholder]) => (
                <label key={field} className={`block text-sm text-gray-700 ${field === 'landmark' ? 'sm:col-span-2' : ''}`}>
                  {label}
                  <input
                    required
                    type={field === 'pincode' ? 'text' : 'text'}
                    value={address[field]}
                    onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                    placeholder={placeholder}
                    className="mt-2 w-full border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-black"
                  />
                </label>
              ))}
            </div>
          </div>

          {orderItems.map((item) => (
            <div key={`${item.id}_${item.size}`} className="flex items-center gap-4 border border-gray-200 bg-white p-4">
              <img src={item.image} alt={item.name} className="h-24 w-20 object-cover" />

              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                <p className="mt-2 text-sm text-gray-700">Qty: {item.quantity}</p>
              </div>

              <div className="text-right font-medium text-gray-900">
                {currency}{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Order summary</h2>

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

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-gray-700">Payment method</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <label key={method.name} className={`flex min-w-0 w-full cursor-pointer items-center gap-2 rounded-full border bg-white px-3 py-2 text-sm transition ${paymentMethod === method.name ? 'border-black text-black' : 'border-gray-300 text-gray-700'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === method.name}
                    onChange={() => setPaymentMethod(method.name)}
                    className="sr-only"
                  />
                  {method.image ? (
                    <img src={method.icon} alt="" className="h-6 w-6 shrink-0 object-contain" />
                  ) : (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-base font-semibold" aria-hidden="true">{method.icon}</span>
                  )}
                  <span className="min-w-0 truncate">{method.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full cursor-pointer bg-black px-4 py-3 text-sm font-medium uppercase tracking-wide text-white"
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder