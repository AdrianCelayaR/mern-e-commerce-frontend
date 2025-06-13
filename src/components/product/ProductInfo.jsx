import React, { useState } from 'react'
import { Check, ShoppingBag, Heart, Share2 } from "lucide-react"
const cn = (...classes) => classes.filter(Boolean).join(' ')

const ProductInfo = ({ product, selectedColor, setSelectedColor, selectedSize, setSelectedSize, quantity, setQuantity, addToCart, currency }) => {
    
    const [addedToCart, setAddedToCart] = useState(false)
    const existDiscount = product.originalPrice && product.originalPrice > product.price

    const handleAddToCart = () => {
        setAddedToCart(true)
    
        // Reset after animation
        setTimeout(() => {
            setAddedToCart(false)
        }, 2000)

        // Call the addToCart function from context
        addToCart(product._id, quantity, selectedSize, selectedColor)
    
        // Here you would add the product to the cart
        console.log("Added to cart:", {
            product: product._id,
            color: selectedColor,
            size: selectedSize,
            quantity,
        })
    }
    return (
        <div className="space-y-6">
            {/* Product Name and Price */}
            <div>
                <h1 className="text-3xl font-light mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                    <span className="text-2xl">{currency}{product.price.toFixed(2)}</span>
                    {existDiscount && (
                        <span className="text-sm text-gray-500 line-through">{currency}{product.originalPrice.toFixed(2)}</span>
                    )}
                    {existDiscount && (
                        <span className="bg-black text-white px-2 py-1 text-sm">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                    )}
                </div>
            </div>

            {/* Short Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Color Selection */}
            <div>
                <h3 className="text-sm font-medium mb-3">
                    COLOR: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex gap-2">
                    {product.colors.map((color) => (
                        <button
                            key={color}
                            className={cn(
                                "w-8 h-8 rounded-full border transition-all relative",
                                selectedColor === color
                                    ? "ring-2 ring-offset-2 ring-black"
                                    : "hover:ring-1 hover:ring-offset-1 hover:ring-gray-300",
                            )}
                            style={{ backgroundColor: getColorHex(color) }}
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Select ${color} color`}
                            aria-pressed={selectedColor === color}
                        >
                            {selectedColor === color && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <Check size={16} className={getTextColor(color)} />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium">
                        SIZE: <span className="font-normal">{selectedSize}</span>
                    </h3>
                    <button className="text-sm underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-none border text-sm cursor-pointer transition-colors",
                                selectedSize === size ? "border-black bg-black text-white" : "border-gray-200 hover:border-gray-300",
                            )}
                            onClick={() => setSelectedSize(size)}
                            aria-label={`Select ${size} size`}
                            aria-pressed={selectedSize === size}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity Selector */}
            <div>
                <h3 className="text-sm font-medium mb-3">QUANTITY</h3>
                <div className="flex border border-gray-200 w-32">
                    <button
                        className="w-10 h-10 flex items-center justify-center border-r border-gray-200 text-lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <div className="flex-1 h-10 flex items-center justify-center">{quantity}</div>
                    <button
                        className="w-10 h-10 flex items-center justify-center border-l border-gray-200 text-lg"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                    className={cn(
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2 flex-1 h-12 bg-black hover:bg-gray-800 text-white relative overflow-hidden",
                        addedToCart && "pointer-events-none",
                      )}
                      onClick={() => handleAddToCart()}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center gap-2 w-full transition-transform duration-300",
                          addedToCart ? "translate-y-[-100%]" : "translate-y-0",
                        )}
                      >
                        <ShoppingBag size={18} />
                        Add to Cart
                      </span>
                      <span
                        className={cn(
                          "absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300",
                          addedToCart ? "translate-y-0" : "translate-y-[100%]",
                        )}
                      >
                        <Check size={18} />
                        Added to Cart
                      </span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:text-accent-foreground px-4 py-2 flex-1 h-12 border-gray-300 hover:bg-gray-50">
                    <Heart size={18} className="mr-2" />
                    Add to Wishlist
                </button>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex gap-2">
                    <span className="font-medium min-w-24">SKU:</span>
                    <span>{product.sku}</span>
                </div>
                <div className="flex gap-2">
                    <span className="font-medium min-w-24">Category:</span>
                    <span>{product.category}</span>
                </div>
                <div className="flex gap-2">
                    <span className="font-medium min-w-24">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                        {product.tags.map((tag) => (
                            <span key={tag} className="bg-gray-100 px-2 py-1 text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Share */}
            <div className="pt-6 flex items-center justify-end gap-4">
                <button className="flex justify-self-end items-center gap-2 cursor-pointer hover:text-gray-500">
                    <Share2 size={18} />
                    Share
                </button>
            </div>
        </div>
    )
}

// Helper functions for color display
function getColorHex(colorName) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = colorName;
    return ctx.fillStyle;
}

function getTextColor(colorName) {
    // const darkColors = ["black", "navy", "burgundy", "brown", "charcoal", "olive"];
    const hexColor = getColorHex(colorName);
    const rgb = parseInt(hexColor.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Calculate luminance
    return luminance < 140 ? "text-white" : "text-black"; // Use luminance to determine text color
}

export default ProductInfo