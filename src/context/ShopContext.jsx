import React, { createContext, useEffect, useState } from "react";
import { products, orders } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [visible, setVisible] = React.useState(false);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    // Estado para el carrito
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar un producto al carrito diferenciando por id, size y color
    const addToCart = (productId, quantity = 1, size, color) => {
        if (!size || !color || quantity <= 0) {
            toast.error('Please select size, color and quantity');
            return;
        }

        const itemKey = `${productId}-${size}-${color}`;

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex(
                (item) => item.itemKey === itemKey
            );
            if (existingIndex !== -1) {
                return prevItems.map((item, idx) =>
                    idx === existingIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [
                    ...prevItems,
                    { productId, quantity, size, color, itemKey }
                ];
            }
        });
    };

    // Función para eliminar un producto del carrito por id, size y color
    const removeFromCart = (productId, size, color) => {
        const itemKey = `${productId}-${size}-${color}`;
        
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.itemKey !== itemKey)
        );
    };

    const updateCartQuantity = (productId, quantity, size, color) => {
        const itemKey = `${productId}-${size}-${color}`;
        if (quantity <= 0) {
            removeFromCart(productId, size, color);
            return;
        }
        
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.itemKey === itemKey
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const getCartCount = () => {
        let totalCount = 0;
        cartItems.forEach((item) => {
            totalCount += item.quantity;
        });
        console.log("PRODUCTS IN CART:", cartItems);
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        cartItems.forEach((item) => {
            const product = products.find((p) => p._id === item.productId);
            if (product) {
                totalAmount += product.price * item.quantity;
            }
        });
        return totalAmount || 0;
    }

    function navigateWithScroll(path) {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function existDiscount(originalPrice, price) {
        return originalPrice && originalPrice > price;
    }

    function amountDiscountProduct(originalPrice, price) {
        if (existDiscount(originalPrice, price)) {
            return Math.round((1 - price / originalPrice) * 100);
        }
        return null;
    }

    const value = {
        products,
        orders,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
        navigateWithScroll,
        existDiscount,
        amountDiscountProduct,
        visible,
        setVisible,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;