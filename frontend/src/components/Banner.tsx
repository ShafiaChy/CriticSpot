
import 'react-loading-skeleton/dist/skeleton.css'

import backgroundVideoUrl from "../../src/assets/video.mp4";
import { Link } from 'react-router-dom';


const Banner = () => {
   

    return (
        <div>
            <div className="flex justify-between gap-4 px-0 mt-8 overflow-hidden bg-white lg:gap-8 md:mt-0 lg:px-0 md:px-4">
               
    <div className="relative max-h-lg w-full md:h-screen bg-black py-10">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundVideoUrl}
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
        {/* Logo */}
        <h1 className="mt-12 text-4xl font-bold text-red-400">Critic<span className="text-white">Spot</span></h1>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold my-4">
          Looking for authentic reviews?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Whether you're planning a weekend getaway, a business trip, or just
          need a reliable ride for the day, we offer a wide range of vehicles to
          suit your needs.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link to="/Car-listing">
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
            Explore
          </button>
          </Link>
         <Link to="/about/who-are-we">
         <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
            Learn More
          </button>
         </Link>
        </div>

       
        
      </div>
    </div>
            </div>
          
        </div>
    )
}

export default Banner;