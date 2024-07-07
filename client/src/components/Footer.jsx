import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">Telephone: +1234567890</p>
            <p className="text-gray-300">Email: info@example.com</p>
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
            <p className="text-gray-300">123 Company St, City, Country</p>
            {/* Replace with your actual embedded map code */}
            <div className="mt-4">
              <iframe
                title="Company Location"
                width="100%"
                height="200"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed/v1/place?q=place_id&key=YOUR_API_KEY"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
