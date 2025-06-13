import React from 'react'
import EmblaCarousel from './EmblaCarousel'

import { assets } from '../assets/assets'

const slides = [
  {
    title: "Alarm Clock Carbon",
    description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: `${assets.hero_img}`,
    link: "/products/left-sidebar",
  },
  {
    title: "Angel Wooden Chair",
    description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: `${assets.logo}`,
    link: "/products/left-sidebar",
  },
  {
    title: "Bamboo Wicker Basket",
    description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    image: `${assets.hero_img}`,
    link: "/products/left-sidebar",
  }
]

const HeroCarousel = () => {
  const OPTIONS = { loop: true }
  const SLIDES = slides.map((slide, index) => (
    <div key={index} className=" pa-15 sm:pa-20 lg:pa-30 xl:pa-40 2xl:pa-50 bg-gray-100 rounded-lg shadow-lg border border-gray-200">
        <div className="text-gray-800">
            <div className="w-full sm:w-1/2 flex flex-col items-start justify-center p-10">
            <div className="flex items-center gap-2 mb-4">
                <p className="w-8 h-[2px] bg-gray-800"></p>
                <p className="font-medium text-sm">OUR BESTSELLERS</p>
            </div>
            <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                {slide.title.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                    {word}
                    {i === 1 && <br />}
                </React.Fragment>
                ))}
            </h1>
            <p className="sm:text-xl mb-4 text-gray-600">
                {slide.description.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                    {word}
                    {i % 7 === 6 && <br />}
                </React.Fragment>
                ))}
            </p>
            <div className="button-wrap mt-[30px]">
                <a
                className="text-[18px] leading-[18px] border-b border-black transition-all hover:text-primary hover:border-primary"
                href={slide.link}
                >
                Discover now
                </a>
            </div>
            </div>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center p-10">
            <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
        </div>
    </div>
  ))

  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />
}

export default HeroCarousel
