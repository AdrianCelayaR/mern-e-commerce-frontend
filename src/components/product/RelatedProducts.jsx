import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import ProductItem from '../ProductItem';
import Title from '../Title';
import EmblaCarouselRelatedProducts from '../EmblaCarouselRelatedProducts';
import '../../styles/emblaRelatedProducts.css'

const RelatedProducts = ({category, subCategory}) => {

    const { products } = useContext(ShopContext);
    const [ related, setRelated ] = useState([]);


    const OPTIONS = { align: 'start', loop: false, draggable: true, speed: 10 };
    const SLIDE_COUNT = 10
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    // const SLIDES = related.map((item, index) => (
    //     <ProductItem key={index} name={item.name} _id={item._id} price={item.price} image={item.image} />
    // ));

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => item.category === category);
            productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);

            setRelated(productsCopy.slice(0, 10));
        }
    }, [products])

    return (
        <div className='my-24'>
            <div className='flex items-center justify-between mb-6'>
                <Title text1={"Related"} text2="Products"/>
                {/* <button className='text-sm text-gray-500'>See all</button> */}
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {/* {related.map((item, index) => (
                    <ProductItem key={index} name={item.name} _id={item._id} price={item.price} image={item.image} />
                ))} */}
            </div>
            <div>
                <EmblaCarouselRelatedProducts slides={SLIDES} options={OPTIONS} related={related} />
            </div>
        </div>
    )
}

export default RelatedProducts