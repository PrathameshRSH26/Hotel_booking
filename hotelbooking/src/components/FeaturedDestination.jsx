import React from 'react'
import { roomsDummyData } from '../assets/assets'
import Hotelcard from './Hotelcard'
import Titled from './Title'
import { useNavigate } from 'react-router-dom'

function FeaturedDestination() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

        <Titled title='Featured Destination' subtitle='Explore the best hotels in the world' />

        
        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {roomsDummyData.slice(0,4).map((room,index)=>(
                <Hotelcard key={room._id} room={room} index={index} />
            ))}
        </div>

        <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}
         className='my-16 py-2 px-4 text-sm font-medium border border-gray-300 rounded bgb-white hover:bg-gray-50 transition-all cursor-pointer'>
            View all Destinations
        </button>
    </div>
  )
}

export default FeaturedDestination