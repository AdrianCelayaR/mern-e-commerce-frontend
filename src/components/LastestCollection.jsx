import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import ProductItemTemp from './ProductItemTemp';

const LastestCollection = () => {

    const { products } = useContext(ShopContext);
    const [ lastestProducts, setLastestProducts ] = useState([]);

    useEffect(() => {
        setLastestProducts(products.slice(0, 10));
    }, [])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3x1'>
                <Title text1={'LASTEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

            {/* Rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {/* {
                    lastestProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            _id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                } */}
                {/* <ProductItemTemp /> */}
                {
                    lastestProducts.map((item, index) => (
                        <ProductItemTemp 
                            key={index}
                            name={item.name}
                            _id={item._id}
                            price={item.price}
                            originalPrice={item.originalPrice}
                            image={item.image}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default LastestCollection