import React, { useState } from 'react'
const cn = (...classes) => classes.filter(Boolean).join(' ')

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState("description")

    const tabs = [
        { id: "description", label: "Description" },
        { id: "details", label: "Additional Information" },
        { id: "shipping", label: "Shipping & Returns" },
        // { id: "care", label: "Care Instructions" },
    ]

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={cn(
                                "px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                                activeTab === tab.id ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black",
                            )}
                            onClick={() => setActiveTab(tab.id)}
                            aria-selected={activeTab === tab.id}
                            role="tab"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="py-8">
                {activeTab === "description" && (
                    <div className="prose max-w-none">
                        <h3 className="text-xl font-light mb-4">Product Description</h3>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                )}

                {activeTab === "details" && (
                    <div>
                        <h3 className="text-xl font-light mb-4">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-2">Materials</h4>
                                <p>{product.materials}</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Dimensions</h4>
                                <p>{product.dimensions}</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Weight</h4>
                                <p>{product.weight}</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Origin</h4>
                                <p>{product.origin}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "shipping" && (
                    <div>
                        <h3 className="text-xl font-light mb-4">Shipping & Returns</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Shipping</h4>
                                <p>Free standard shipping on all orders over $100. Delivery within 3-5 business days.</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Standard Shipping: 3-5 business days</li>
                                    <li>Express Shipping: 1-2 business days</li>
                                    <li>International Shipping: 7-14 business days</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Returns</h4>
                                <p>
                                    We offer a 30-day return policy for all unused and unworn items. Return shipping is free for
                                    exchanges.
                                </p>
                                <p className="mt-2">
                                    Please note that personalized items cannot be returned unless damaged or defective.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* {activeTab === "care" && (
                    <div>
                        <h3 className="text-xl font-light mb-4">Care Instructions</h3>
                        <div className="space-y-4">
                            <p>{product.careInstructions}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {product.careSymbols.map((symbol, index) => (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 flex items-center justify-center border border-gray-200 mb-2">
                                            {symbol.icon}
                                        </div>
                                        <span className="text-sm">{symbol.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default ProductTabs