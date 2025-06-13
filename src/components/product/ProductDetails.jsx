import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import ProductGallery from './ProductGallery';

const ProductDetails = () => {

    const {productId} = useParams();
    const {products} = useContext(ShopContext);
    const [product, setProductData] = useState(false);

    const fetchProductData = async () => {
        products.map((item) => {
        if(item._id === productId) {
            setProductData(item);
            console.log(item);
            return;
        }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products])

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8">
                <span>Home</span> / <span>{product.category}</span> / <span className="text-black">{product.name}</span>
                </div>

                {/* Product Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Product Gallery */}
                <ProductGallery images={product.image} name={product.name} />

                {/* Product Info */}
                {/* <ProductInfo
                    product={product}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    quantity={quantity}
                    setQuantity={setQuantity}
                /> */}
                </div>

                {/* Product Tabs */}
                {/* <ProductTabs product={product} />

                <Separator className="my-16" /> */}

                {/* Reviews Section */}
                {/* <ReviewsSection reviews={product.reviews} />

                <Separator className="my-16" /> */}

                {/* Related Products */}
                {/* <RelatedProducts currentProductId={product.id} category={product.category} /> */}
            </div>
        </div>
    )
}

export default ProductDetails