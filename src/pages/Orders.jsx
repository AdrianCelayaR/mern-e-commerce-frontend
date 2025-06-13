import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import OrdersList from '../components/orders/OrdersList';

const Orders = () => {

  const { products, orders, currency, navigateWithScroll } = useContext(ShopContext);
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-medium mb-4"><Title text1={'MY'} text2={'ORDERS'} /></h2>
          <OrdersList orders={orders} currency={currency} />
        </div>
      </div>
    </div>
  )
}

export default Orders