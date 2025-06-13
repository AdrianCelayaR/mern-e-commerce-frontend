import React, { useContext } from 'react'
import Title from '../components/Title'
import CartTotals from '../components/CartTotals'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const { navigateWithScroll } = useContext(ShopContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-light mb-8"><Title text1={'DELIVERY'} text2={'INFORMATION'} /></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery Information Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Doe" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input type="tel" className="w-full border rounded px-3 py-2" placeholder="+1 555 123 4567" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Street</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="NY" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Zip Code</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="10001" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Country</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="USA" />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <CartTotals />
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <Title text1={'PAYMENT'} text2={'METHOD'} />
              {/* --------------- Payment Method Selection --------------- */}
              <div className='flex gap-3 flex-col lg:flex-row'>
                <div className="flex items-center gap-2">
                  <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" className="h-4 w-4 text-black border-gray-300 focus:ring-black" />
                  <label htmlFor="creditCard" className="text-sm font-medium">Credit Card</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="paypal" name="paymentMethod" value="paypal" className="h-4 w-4 text-black border-gray-300 focus:ring-black" />
                  <label htmlFor="paypal" className="text-sm font-medium">PayPal</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer" className="h-4 w-4 text-black border-gray-300 focus:ring-black" />
                  <label htmlFor="bankTransfer" className="text-sm font-medium">Efectivo</label>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={() => navigateWithScroll('/orders')} type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                  Place Order
                </button>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default PlaceOrder