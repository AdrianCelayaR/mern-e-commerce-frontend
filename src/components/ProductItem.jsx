import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const ProductItem = ({ _id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
  
    return (
        <Link to={`/products/${_id}`} className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden h-48 sm:h-52 md:h-60 lg:h-72'>
                <img src={image[0]} alt={name} className='object-cover hover:scale-110 transition ease-in=out' />
            </div>
            <p className='pt-3 pb-1 text-sm'>
              {name}  
            </p>
            <p className='text-gray-500 text-sm font-medium'>
                {currency}{price}
            </p>
        </Link>
    )
}

export default ProductItem