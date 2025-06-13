import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { assets } from '../assets/assets';

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
];

const HeroCarousel = () => {
    return (
        <div className="hero-area">
            <div className="container-fluid">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    effect="fade"
                    loop
                    className="hero-carousel pa-15 sm:pa-20 lg:pa-30 xl:pa-40 2xl:pa-50 bg-gray-100 rounded-lg shadow-lg border border-gray-200"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} style={{ marginRight: '50px' }}>
                            <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden h-[500px] sm:h-[600px]">
                                <div className="w-full sm:w-1/2 flex flex-col items-start justify-center p-10">
                                    <div className="text-gray-800">
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        
        
    );
};

export default HeroCarousel;
