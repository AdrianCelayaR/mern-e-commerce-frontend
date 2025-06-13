import React, { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useAutoplay } from './EmblaCarouselAutoplay'
import { useAutoplayProgress } from './EmblaCarouselAutoplayProgress'
import '../styles/embla.css'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

const EmblaCarousel = ({ slides, options }) => {
  const progressNode = useRef(null)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden w-full h-full border border-gray-200">
                {/* Contenido del Hero */}
                <div className="w-full sm:w-1/2 flex flex-col items-start justify-center p-6 sm:p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <p className="w-8 h-[2px] bg-gray-800"></p>
                    <p className="font-medium text-sm">OUR BESTSELLERS</p>
                  </div>
                  <h1 className="prata-regular text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4">
                    {slide.title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word}
                        {i === 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="text-sm sm:text-base md:text-xl mb-4 text-gray-600 break-words">
                    {slide.description}
                  </p>
                  <div className="mt-[30px]">
                    <a
                      className="text-[18px] leading-[18px] border-b border-black transition-all hover:text-primary hover:border-primary"
                      href={slide.link}
                    >
                      Discover now
                    </a>
                  </div>
                </div>

                {/* Imagen del Hero */}
                <div className="w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-10">
  <img
    src={slide.image}
    alt={slide.title}
    className="w-full h-auto object-cover rounded-lg shadow-lg max-h-[300px] sm:max-h-[500px] md:max-h-[600px]"
  />
</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles del Carrusel
      <div className="embla__controls">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="embla__button"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="embla__button"
        />
      </div>*/}
    </div> 
  )
}

export default EmblaCarousel
