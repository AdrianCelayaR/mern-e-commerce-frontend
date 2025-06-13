import React from 'react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import ProductItem from './ProductItem'
import ProductItemTemp from './ProductItemTemp'




const EmblaCarouselRelatedProducts = (props) => {
    const { slides, options, related } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla-related-products">
            <div className="embla__viewport-related-products" ref={emblaRef}>
                <div className="embla__container-related-products">
                    {related.map((item, index) => (
                        <div className="embla__slide-related-products" key={index}>
                            <div className="embla__slide__number-related-products">
                                    <ProductItemTemp key={index} name={item.name} _id={item._id} price={item.price} originalPrice={item.originalPrice} image={item.image} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls-related-products">
                <div className="embla__buttons-related-products">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </section>
    )
}

export default EmblaCarouselRelatedProducts