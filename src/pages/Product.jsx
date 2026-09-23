import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextDefinition'

const Product = () => {
  const { productid } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const productData = products.find((item) => item._id === productid)
  const selectedImage = image || productData?.image?.[0] || ''
  const selectedSize = size || productData?.sizes?.[0] || ''

  const handleAddToCart = () => {
    addToCart(productData._id, selectedSize)
  }

  const handleBuyNow = () => {
    navigate('/Placeorder', {
      state: {
        type: 'product',
        product: productData,
        size: selectedSize || 'N/A',
      },
    })
  }

  if (!productData) {
    return <div className="py-12 text-center text-gray-500">Product not found</div>
  }

  return (
    <div className="border-t border-gray-200 pt-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex gap-2 overflow-x-auto sm:w-[20%] sm:flex-col sm:overflow-y-auto">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productData.name}
                className={`h-24 w-24 cursor-pointer object-cover border ${
                  selectedImage === img ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={selectedImage}
              alt={productData.name}
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            {productData.category}
          </p>
          <h1 className="mt-3 text-3xl font-medium text-gray-900">{productData.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900">
            {currency}
            {productData.price}
          </p>

          <p className="mt-6 text-sm leading-7 text-gray-700">
            {productData.description}
          </p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium uppercase text-gray-700">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((itemSize) => (
                <button
                  key={itemSize}
                  type="button"
                  onClick={() => setSize(itemSize)}
                  className={`min-w-12 border px-3 py-2 text-sm ${
                    size === itemSize
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {itemSize}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="cursor-pointer bg-black px-8 py-3 text-sm font-medium uppercase tracking-wide text-white"
            >
              Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              className="cursor-pointer border border-black px-8 py-3 text-sm font-medium uppercase tracking-wide text-black"
            >
              Buy now
            </button>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Category:</span>{' '}
              {productData.subCategory}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-gray-900">Delivery:</span> Free delivery across India
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product