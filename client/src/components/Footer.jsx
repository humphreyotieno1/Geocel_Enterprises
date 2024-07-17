import React from 'react';
import MapboxMap from './MapboxMap'; // Adjust the path according to your project structure

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">Telephone: +254 726 588 499</p>
            <p className="text-gray-300">Email: geocelenterprises2020@gmail.com</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com/example" className="text-gray-300 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/example" className="text-gray-300 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/example" className="text-gray-300 hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Address and Map */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
            <p className="text-gray-300">Bondo Juction, Opp Siaya GK Prison, Siaya</p>
            <div className="mt-4">
              <MapboxMap />
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Our Partners</h3>
          <div className="flex space-x-8 justify-center">
            <img src="https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721224326/GeocelDB/assets/bamburi.jpg" alt="Partner 1" className="h-16 w-16 object-contain" />
            <img src="https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721224326/GeocelDB/assets/coolbase.jpg" alt="Partner 2" className="h-16 w-16 object-contain" />
            <img src="https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721224326/GeocelDB/assets/crown.jpg" alt="Partner 3" className="h-16 w-16 object-contain" />
            {/* <img src="/path/to/partner4_logo.jpg" alt="Partner 4" className="h-16 w-16 object-contain" /> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
