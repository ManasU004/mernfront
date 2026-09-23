import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextDefinition'

const Orders = () => {
  const { orders, currency } = useContext(ShopContext)

  if (!orders.length) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-lg font-medium text-gray-800">You have no orders yet.</p>
        <p className="max-w-md text-sm leading-6 text-gray-500">
          Start shopping to build your order history and keep track of every purchase.
        </p>
        <Link
          to="/Collection"
          className="cursor-pointer bg-black px-6 py-3 text-sm font-medium uppercase tracking-wide text-white"
        >
          Explore collection
        </Link>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">My orders</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900">Order history</h1>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">Order {order.id}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString([], { dateStyle: 'medium' })}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-gray-700">Payment: {order.paymentMethod}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{currency}{order.total}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {order.items?.map((item) => (
                <div key={`${order.id}-${item.id}-${item.size}`} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="mt-1 text-sm text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {currency}{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-600">
              <span className="font-medium text-gray-800">Shipping to:</span>{' '}
              {order.deliveryAddress?.area}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders