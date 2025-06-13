import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotals = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    
    const calculateTotal = () => {
        let total = 0;
        total += getCartAmount();
        total += delivery_fee;
        return total.toFixed(2);
    };


    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow h-fit">
            <h2 className="text-md font-medium mb-4"><Title text1={'ORDER'} text2={'SUMMARY'} /></h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{currency}{getCartAmount().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>{currency}{delivery_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t pt-4">
                <span>Total</span>
                <span>{currency}{calculateTotal()}</span>
            </div>
        </div>
    )
}

export default CartTotals