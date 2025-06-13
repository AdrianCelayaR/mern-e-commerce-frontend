import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSellers from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from '../components/EmblaCarousel'
// import '../styles/embla.css'
import { assets } from '../assets/assets'


const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = [
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
const Home = () => {
  return (
    <div>
        {/* <Hero /> */}
        <div className='-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
        <LastestCollection />
        <BestSellers />
        <OurPolicy />
        <NewsletterBox />
    </div>
  )
}

export default Home