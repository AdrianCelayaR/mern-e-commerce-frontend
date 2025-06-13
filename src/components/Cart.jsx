import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Trash2 } from "lucide-react";

const Cart = () => {
    const { cartItems, products, removeFromCart, updateCartQuantity } = useContext(ShopContext);

    const cartProductDetails = cartItems.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        return { ...product, quantity: item.quantity };
    });

    const calculateTotal = () => {
        return cartProductDetails.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (cartProductDetails.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-light">Your cart is empty</h2>
                <p className="text-gray-500 mt-4">Add some products to your cart to see them here.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 h-fit">
            <h1 className="text-3xl font-light mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cartProductDetails.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                            <img
                                src={item.image[0]}
                                alt={item.name}
                                className="w-24 h-24 object-cover border rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">{item.name}</h2>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <button
                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                        onClick={() => updateCartQuantity(item._id, Math.max(1, item.quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                        onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                <button
                                    className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg border-t pt-4">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <button className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;