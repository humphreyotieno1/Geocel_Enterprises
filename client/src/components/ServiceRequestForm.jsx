import React, { useState, useEffect } from 'react';

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://geocel-enterprises.onrender.com/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://geocel-enterprises.onrender.com/service_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
      } else {
        setResponseMessage('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Error submitting form');
    }

    setFormData({
      name: '',
      email: '',
      service: '',
      message: '',
    });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md max-w-xl mx-auto overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Request a Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a service</option>
            {services && services.length > 0 ? (
              services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading services...
              </option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white text-sm font-bold uppercase rounded hover:bg-gray-700"
          >
            Submit Request
          </button>
          <p>{responseMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
