import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const ProductItemTemp = ({ _id, image, name, price, originalPrice }) => {
    const { currency } = useContext(ShopContext);

    const existDiscount = originalPrice && originalPrice > price;
    
    return (
        <Link to={`/products/${_id}`} className='text-gray-700 cursor-pointer mb-5'>
            <div className="relative h-[250px] sm:h-43 md:h-50 mb-4 overflow-hidden">
                <img 
                    src={image[0]} // Fallback to image if image[0] is not available
                    alt={name}
                    className='object-cover transition-transform duration-500 hover:scale-105'
                />
                {existDiscount && (
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs">
                        {Math.round((1 - price / originalPrice) * 100)}% OFF
                    </div>
                )}
            </div>
            <h3 className="text-sm font-medium">{name}</h3>
            <div className="flex items-center gap-2">
                <span>${price.toFixed(2)}</span>
                {existDiscount && (
                    <span className="text-sm text-gray-500 line-through">{currency}{originalPrice.toFixed(2)}</span>
                )}
            </div>
        </Link>
    )
}

export default ProductItemTemp