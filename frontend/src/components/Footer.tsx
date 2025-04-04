
import ImageOne from '../../src/assets/images/ImageOne.jpg'
import ImageTwo from '../../src/assets/images/ImageTwo.jpg'
import ImageThree from '../../src/assets/images/ImageThree.jpg'
import ImageFour from '../../src/assets/images/ImageFour.jpg'
import ImageFive from '../../src/assets/images/ImageFive.jpg'
import ImageSix from '../../src/assets/images/ImageSix.jpg'

const Footer = () => {
    const galleryImages = [
        { src: ImageOne, alt: "Gallery 1" },
        { src: ImageTwo, alt: "Gallery 2" },
        { src: ImageThree, alt: "Gallery 3" },
        { src: ImageFour, alt: "Gallery 4" },
        { src: ImageFive , alt: "Gallery 5" },
        { src: ImageSix, alt: "Gallery 6" },
      ];
    return (
       // Footer.js


    <footer className=" text-blackpy-10 px-5 mt-16">
      <div className="flex flex-wrap justify-between gap-10">
        {/* Logo & Description */}
        <div className="max-w-xs">
          <h1 className="text-2xl font-bold mb-3">CriticSpot</h1>
          <p className="text-sm mb-5 leading-relaxed">
            Proin a interdum elit. Etiam eu sapien sem. Suspendisse a massa justo.
            Cras eget lorem nunc. Fusce nec urna tempus tempus.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="hover:text-red-500">
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-red-500">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500">
              <i className="fab fa-youtube text-lg"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-red-500">
              <i className="fab fa-twitter text-lg"></i>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col space-y-5">
          <h3 className="font-semibold text-lg">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500">History</a></li>
            <li><a href="#" className="hover:text-red-500">Our Team</a></li>
            <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-500">Services Offered</a></li>
            <li><a href="#" className="hover:text-red-500">Product Catalog</a></li>
          </ul>
        </div>

        {/* Information */}
        <div className="flex flex-col space-y-5">
          <h3 className="font-semibold text-lg">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500">FAQ/Return</a></li>
            <li><a href="#" className="hover:text-red-500">Privacy/Terms</a></li>
            <li><a href="#" className="hover:text-red-500">Affiliate</a></li>
            <li><a href="#" className="hover:text-red-500">Sizing Guide</a></li>
            <li><a href="#" className="hover:text-red-500">Accessibility</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col space-y-5">
          <h3 className="font-semibold text-lg">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500">Your Account</a></li>
            <li><a href="#" className="hover:text-red-500">Press Release</a></li>
            <li><a href="#" className="hover:text-red-500">Return Centre</a></li>
            <li><a href="#" className="hover:text-red-500">App Download</a></li>
            <li><a href="#" className="hover:text-red-500">Advertisements</a></li>
          </ul>
        </div>

        {/* Gallery */}
        <div className="max-w-xs">
          <h3 className="font-semibold text-lg mb-5">Follow @Instagram</h3>
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



export default Footer;