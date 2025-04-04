import { useInView } from "react-intersection-observer";
import { FaCheck } from "react-icons/fa6";
import homeOne from '../../src/assets/images/homeOne.jpg'
import homeTwo from '../../src/assets/images/homeTwo.jpg'
const HowDoWeVerify = () => {
    const { ref: imageRef1, inView: isImage1Visible } = useInView({
        triggerOnce: true, // Animate only once
        threshold: 0.2,    // Trigger when 20% of the section is visible
      });
    
      const { ref: imageRef2, inView: isImage2Visible } = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });
    return (
        <section className="bg-black text-white px-6 py-24 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 md:grid-rows-3 gap-6 md:gap-10">
         <div className=" h-56">
         <h2 className="text-sm font-semibold tracking-wide uppercase text-red-500">
          Review Hub
          </h2>
          <h1 className="mt-2 text-4xl font-bold lg:text-5xl">
            We Serve You 100%  <br /> Authentic Reviews
          </h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Ut eleifend mattis ligula, porta finibus urna gravida at. Aenean
            vehicula sodales arcu non mattis. Integer dapibus ac dui pretium
            blandit. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos.
          </p>
         </div>
  
          <div className="row-span-2">
            {/* Image 1 */}
            <div
              ref={imageRef1}
              className={`transition-opacity duration-700 ${
                isImage1Visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                 src={homeOne}
                alt="Indoor Furniture"
                className="rounded-lg shadow-lg"
              />
            </div>
  
           </div>
        
          <div className="row-span-2" >
               {/* Image 2 */}
            <div
              ref={imageRef2}
              className={`transition-opacity duration-1000 ${
                isImage2Visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={homeTwo}
                alt="Outdoor Furniture"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
  
          <div className="mt-8 row-span-2">
            <h3 className="text-xl font-semibold">Discover Endless Reviews</h3>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Integer dapibus ac dui pretium blandit. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos. Ut
              eleifend mattis ligula, porta finibus urna gravida at. Aenean
              vehicula sodales arcu non mattis.
            </p>
            <ul className="mt-4 text-gray-400 space-y-2">
              <li className="flex items-center">
                <span className="text-red-500  mr-2"><FaCheck/></span> At eleifend mattis
                ligula, porta finibus urna gravida at.
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2"><FaCheck/></span> Kenean vehicula
                sodales arcu non mattis.
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2"><FaCheck/></span> Ginteger dapibus ac
                dui pretium blans optent.
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
};

export default HowDoWeVerify;