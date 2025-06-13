import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductTabs from '../components/product/ProductTabs'
import ReviewsSection from '../components/product/ReviewsSection'
import RelatedProducts from '../components/product/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, addToCart, currency } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setSelectedColor(item.colors[0])
        setSelectedSize(item.sizes[0])
        console.log(item)
        return
      }
    })
  }

  useEffect(() => {
    fetchProductData();
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [productId, products]);
  
  

  if (!productData) {
    return <div className='text-center text-2xl font-bold mt-10'>
        Loading...
      </div>
  }

  return (
    <div className='bg-white'>
      <div className="container mx-auto px-4 py-2">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <span>Home</span> / <span>{productData.category}</span> / <span className="text-black">{productData.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery images={productData.image} name={productData.name} />
          <ProductInfo
            product={productData}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
            currency={currency}
          />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={productData} />

        <div className="my-16 border-t border-gray-400"></div>

        {/* Reviews Section */}
        <ReviewsSection reviews={productData.reviews} />

        <div className="my-16 border-t border-gray-400"></div>

        {/* Related Products */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  )
}

export default Product