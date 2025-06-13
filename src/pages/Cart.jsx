import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Trash2 } from "lucide-react";
import Title from "../components/Title";
import CartTotals from "../components/CartTotals";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const { cartItems, products, currency, removeFromCart, updateCartQuantity, navigateWithScroll, existDiscount } = useContext(ShopContext);

    const cartProductDetails = cartItems.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        return { ...product, quantity: item.quantity, size: item.size, color: item.color, itemKey: item.itemKey };
    });


    if (cartProductDetails.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-light">Your cart is empty</h2>
                <p className="text-gray-500 mt-4">Add some products to your cart to see them here.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-light mb-8"><Title text1={'SHOPPING'} text2={'CART'} /></h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cartProductDetails.map((item) => (
                        <div key={item.itemKey} className="flex items-center gap-4 border-b pb-4">
                            <NavLink to={`/products/${item._id}`} className="flex-shrink-0">
                                <img
                                    src={item.image[0]}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover border rounded"
                                />
                            </NavLink>
                            <div className="flex-1">
                                {/* <h2 className="text-sm font-medium">{item.name}</h2> */}
                                <NavLink to={`/products/${item._id}`} className="text-sm font-medium hover:underline">
                                    <h2 className="font-medium" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.3rem)" }}>
                                        {item.name}
                                    </h2>
                                </NavLink>
                                <p className="text-sm text-gray-500">{item.category}, {item.size}, {item.color}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <button
                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                        onClick={() => updateCartQuantity(item._id, Math.max(0, item.quantity - 1), item.size, item.color)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 border rounded hover:bg-gray-100"
                                        onClick={() => updateCartQuantity(item._id, item.quantity + 1, item.size, item.color)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-medium">{currency}{(item.price * item.quantity).toFixed(2)}</p>
                                {existDiscount(item.originalPrice, item.price) && (
                                    <p className="text-sm text-gray-500 line-through">{currency}{(item.originalPrice * item.quantity).toFixed(2)}</p>
                                )}
                                <button
                                    className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                                    onClick={() => removeFromCart(item._id, item.size, item.color)}
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="rounded-lg h-fit">
                    <CartTotals />
                    <button onClick={() => navigateWithScroll('/place-order')} className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;