import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const ServiceRequestForm = ({ services }) => {
  const { addToCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Find the selected service object
    const service = services.find(service => service.name === selectedService);

    if (!service) {
      alert("Please select a service.");
      return;
    }

    // Create a service request object
    const serviceRequest = {
      name,
      email,
      service: service.name,
      details
    };

    // Add service to cart
    addToCart(serviceRequest);

    // Reset form fields
    setName('');
    setEmail('');
    setSelectedService('');
    setDetails('');

    // Show confirmation to user
    alert("Request submitted. We have received your service request.");

  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
        <select
          id="service"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>{service.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Additional Details</label>
        <textarea
          id="details"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Request
      </button>
    </form>
  );
};

export default ServiceRequestForm;
