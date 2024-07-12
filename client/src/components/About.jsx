// src/components/About.jsx
import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const coreValues = [
  {
    image: 'https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1720779112/GeocelDB/assets/integrity.jpg',
    title: 'Integrity',
    description: 'We uphold the highest standards of integrity in all of our actions.'
  },
  {
    image: 'https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1720779491/GeocelDB/assets/excellence.jpg',
    title: 'Excellence',
    description: 'We strive for excellence in everything we do.'
  },
  {
    image: 'https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1720779135/GeocelDB/assets/customer.jpg',
    title: 'Customer Service',
    description: 'We work together, across boundaries, to meet the needs of our customers.'
  },
  {
    image: 'https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1720779112/GeocelDB/assets/innovation.jpg',
    title: 'Innovation',
    description: 'We value innovative solutions and embrace change.'
  },
];

const teams = [
  {
    image: 'https://via.placeholder.com/150',
    name: 'John Doe',
    position: 'CEO'
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    position: 'CTO'
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Sam Wilson',
    position: 'CFO'
  },
];

const milestones = [
  {
    image: 'https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1720779798/GeocelDB/assets/founded.jpg',
    description: 'Company founded',
    year: '2012'
  },
  {
    image: 'https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1720779811/GeocelDB/assets/zawadi.jpg',
    description: 'Zawadi Challenge Awards Bamburi Cement',
    year: '2020'
  },
];

const About = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <Box className="bg-gray-100 min-h-screen p-5">
      <Box className="text-center mb-10">
        <Text className="text-3xl font-bold mb-4">About Us</Text>
        <Text className="max-w-3xl mx-auto">
          Geocel Enterprises was founded in 2012 by George Ouma. Starting as a small family business, it has grown into a leading provider of hardware and construction services in the region. Over the years, Geocel Enterprises has expanded its offerings and built a reputation for quality and reliability.
        </Text>
      </Box>

      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true}>
        <Box className="flex flex-wrap justify-center py-10 bg-white shadow-lg rounded-lg">
          {coreValues.map((value, index) => (
            <Box
              key={index}
              className="m-4 p-5 bg-gray-200 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
              flex="1"
              maxW="250px"
              textAlign="center"
            >
              <Image src={value.image} alt={value.title} className="mx-auto mb-4 rounded-full" />
              <Text className="text-xl font-bold mb-2">{value.title}</Text>
              <Text>{value.description}</Text>
            </Box>
          ))}
        </Box>

        <Box className="flex flex-wrap justify-center py-10 bg-white shadow-lg rounded-lg">
          {teams.map((member, index) => (
            <Box key={index} className="m-4 p-5 text-center">
              <Image
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-blue-500"
              />
              <Text className="text-xl font-bold">{member.name}</Text>
              <Text className="text-gray-500">{member.position}</Text>
            </Box>
          ))}
        </Box>

        <Box className="flex flex-wrap justify-center py-10 bg-white shadow-lg rounded-lg">
          {milestones.map((milestone, index) => (
            <Box
              key={index}
              className="m-4 p-5 bg-gray-200 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
              flex="1"
              maxW="300px"
              textAlign="center"
            >
              <Image src={milestone.image} alt={milestone.description} className="mx-auto mb-4 rounded-full" />
              <Text className="text-xl font-bold">{milestone.description}</Text>
              <Text className="text-gray-500">{milestone.year}</Text>
            </Box>
          ))}
        </Box>
      </Carousel>

      <Box className="bg-white shadow-lg rounded-lg p-10 mt-10 text-center">
        <Text className="text-3xl font-bold mb-6">Customer Service and More Info</Text>
        <Text className="mb-8">We are here to help you. For any inquiries or further information, please get in touch with our customer service team.</Text>
        <Button colorScheme="blue" size="lg" onClick={handleContactClick}>Contact Us</Button>
      </Box>
    </Box>
  );
};

export default About;
