import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Contact = () => {
  return (
    <Box p={6}>
      <Heading as="h1" mb={6}>
        Contact Us
      </Heading>

      <VStack spacing={10} align="start">
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Get in Touch
          </Heading>
          <HStack mb={4}>
            <Icon as={FaPhone} boxSize={6} />
            <Text fontSize="lg">+254 726 588 499</Text>
          </HStack>
          <HStack mb={4}>
            <Icon as={FaEnvelope} boxSize={6} />
            <Link href="mailto:geocelenterprices2020@gmail.com" fontSize="lg">
              geocelenterprices2020@gmail.com
            </Link>
          </HStack>
          <HStack spacing={4} mb={4}>
            <Link href="https://facebook.com/geocel" isExternal>
              <Icon as={FaFacebook} boxSize={8} />
            </Link>
            <Link href="https://twitter.com/geocel" isExternal>
              <Icon as={FaTwitter} boxSize={8} />
            </Link>
            <Link href="https://instagram.com/geocel" isExternal>
              <Icon as={FaInstagram} boxSize={8} />
            </Link>
          </HStack>
        </Box>

        <Box width="100%" height="400px">
          <Heading as="h2" size="lg" mb={4}>
            Our Location
          </Heading>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                Geocel Enterprises <br /> 123 Main St, London, UK.
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </VStack>
    </Box>
  );
};

export default Contact;
