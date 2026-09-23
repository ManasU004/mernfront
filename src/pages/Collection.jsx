import { useContext, useState } from "react"
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/Product_item'

const categories = ['All', 'Men', 'Women', 'Kids']
const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const priceOptions = [
  { label: 'All prices', value: 'all' },
  { label: 'Under $150', value: 'under-150' },
  { label: '$150 - $300', value: '150-300' },
  { label: 'Above $300', value: 'above-300' },
]

const Collection = () => {
  const { products } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase()
    const searchMatch =
      searchTerm.trim() === '' || productName.includes(searchTerm.trim().toLowerCase())

    const categoryMatch =
      selectedCategory === 'All' || product.category === selectedCategory
    const sizeMatch =
      selectedSize === 'All' || product.sizes.includes(selectedSize)
    const priceMatch =
      selectedPrice === 'all' ||
      (selectedPrice === 'under-150' && product.price < 150) ||
      (selectedPrice === '150-300' && product.price >= 150 && product.price <= 300) ||
      (selectedPrice === 'above-300' && product.price > 300)

    return searchMatch && categoryMatch && sizeMatch && priceMatch
  })

  return (
    <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:gap-8">
      <aside className="w-full sm:w-64">
        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="flex w-full items-center justify-between border border-gray-300 bg-gray-50 px-4 py-3 text-left text-lg font-semibold uppercase tracking-wide text-gray-800"
        >
          <span>Filter</span>
          <span>{showFilter ? '−' : '+'}</span>
        </button>

        <div className={`${showFilter ? 'block' : 'hidden'} mt-3 border border-gray-300 bg-white p-4`}>
          <div className="mb-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    selectedCategory === category
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">
              Price
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              {priceOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    value={option.value}
                    checked={selectedPrice === option.value}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {['All', ...sizes].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-10 rounded border px-2 py-1 text-xs font-medium ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-md items-center border border-gray-300 bg-white px-3 py-2">
            <span className="mr-2 text-gray-400">⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          </p>

          <select className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((item,index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection