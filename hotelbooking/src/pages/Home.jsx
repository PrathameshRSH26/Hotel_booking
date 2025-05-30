import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import Exclusiveoffer from '../components/Exclusiveoffer'
import Testimonial from '../components/Testimonial'
import NewzLetter from '../components/NewzLetter'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestination />
        <Exclusiveoffer />
        <Testimonial />
        <NewzLetter />
    </>
  )
}

export default Home