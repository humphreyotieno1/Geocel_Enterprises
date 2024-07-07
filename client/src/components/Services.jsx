import React, { useState, useEffect } from 'react';
import ServiceRequestForm from '../components/ServiceRequestForm';
import { CartProvider } from '../components/CartContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const servicesData = await response.json();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Settings for the carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <CartProvider> {/* Wrap your component with CartProvider */}
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Our Services</h1>
          <p className="text-lg">We offer a range of services to meet your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Carousel Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <Slider {...carouselSettings}>
              {services.map((service) => (
                <div key={service.id} className="p-4">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="mt-2">{service.description}</p>
                  <p className="mt-2 font-bold">{service.price}</p>
                  <span className={`mt-2 inline-block px-2 py-1 rounded text-white ${service.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {service.availability}
                  </span>
                </div>
              ))}
            </Slider>
          </div>
          {/* Form Section */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <ServiceRequestForm services={services} />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default Services;
