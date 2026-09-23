import { useContext } from 'react';
import Tittle from './Tittle';
import ProductItem from './Product_item';
import { ShopContext } from '../context/ShopContextDefinition';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
        const latestProducts = products.slice(0, 10);

  return (
    <div className='my-10' >
        <div className='text-center py-8 text-3xl' >
            <Tittle text1={'LATEST'} text2={'COLLECTION'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' ></p>
        </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
                {latestProducts.map((item, index) => (
                    <ProductItem key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
    </div>
  )
}

export default LatestCollection