import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from '../components/Cart.jsx'; 
import ServiceRequestForm from './ServiceRequestForm.jsx'; 

const Services = () => {
  const [services, setServices] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  

  const toggleCart = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://127.0.0.1:5000/services');
      const data = await response.json();
      setServices(data);
    };
    fetchServices();
  }, []);

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
            <span
              className={`mt-2 inline-block px-2 py-1 rounded text-white ${
                service.availability ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {service.availability ? 'Available' : 'Subject to Scheduling'}
            </span>
            <span
              className="mt-2 ml-2 inline-block px-2 py-1 rounded text-white bg-gray-800 cursor-pointer"
              onClick={() => addToCart(service, 'service')}
            >
              Add to Cart
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ServiceRequestForm />
      </div>
     
      <Cart showModal={showModal} toggle={toggleCart} />
    </div>
  );
};

export default Services;