import { useContext } from 'react'
import { ShopContext } from '../context/ShopContextDefinition'
import Tittle from './Tittle';
import ProductItem from './Product_item';

const BestSeller = () => {
    const { products } = useContext(ShopContext);

    const bestSeller = products.filter((item) => item.bestseller).slice(0, 5);

    return (
        <div className='my-10' >
            <div className='text-center py-8 text-3xl' >
                <Tittle text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ' ></p>


            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />


                    ))
                }
            </div>



        </div>
    )
}

export default BestSeller