
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from '../components/Cart.jsx';


const Services = () => {

  const [services, setServices] = useState([]);
  const {cartItems, addToCart} = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const toggleCart = () => {
    setShowModal(!showModal);
  };

  useEffect(()=> {
    const fetchServices= async () =>{
      const response = await fetch('http://127.0.0.1:5000/services')
      const data = await response.json()

      setServices(data)

    }
    fetchServices()
  },[]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
       <div className="text-right mb-8">
       <button
          className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
          onClick={toggleCart}
        >
          Cart ({cartItems.length})
        </button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <p className="text-lg">We offer a range of services to meet your needs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="mt-2">{service.description}</p>
            <p className="mt-2 font-bold">{service.price}</p>
            <span className={`mt-2 inline-block px-2 py-1 rounded text-white ${service.availability ? 'bg-green-500' : 'bg-red-500'}`}>
              {service.availability ? 'Available' : 'Subject to Scheduling'}
            </span>
            <span
              className='mt-2 ml-2 inline-block px-2 py-1 rounded text-white bg-gray-800 cursor-pointer'
              onClick={() => addToCart(service, 'service')}
            >
              Add to Cart
            </span>

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

      <Cart showModal={showModal} toggle={toggleCart} />
    </div>
    </CartProvider>
  );
};

export default Services;


const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    details: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Request submitted. We have received your service request.");

    setFormData({
      name: '',
      email: '',
      service: '',
      details: ''
    })
  };

  const handleChange = (event) => {
    const {id, value} = event.target;
    setFormData({
      ...formData,
      [id]:value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          id="name" 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input 
         type="email" 
         id="email" 
         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
         required 
         value={formData.email}
         onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
        <input 
         type="text" 
         id="service" 
         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
         required 
         value={formData.service}
         onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Additional Details</label>
        <textarea 
          id="details" 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={formData.details}
          onChange={handleChange}
        >
        </textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Request
      </button>
    </form>
  );
};

