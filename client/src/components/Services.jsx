import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Badge
} from '@chakra-ui/react';

const services = [
  {
    id: 1,
    name: 'Transport',
    description: 'Reliable transport services for goods and personnel.',
    price: 'Kshs 5000.00',
    availability: 'Available'
  },
  {
    id: 2,
    name: 'Construction',
    description: 'Expert construction services for all types of projects.',
    price: 'Kshs 20000.00',
    availability: 'Available'
  },
  {
    id: 3,
    name: 'Consultation',
    description: 'Professional consultation services for your projects.',
    price: 'Kshs 3000.00 per hour',
    availability: 'Available'
  },
  {
    id: 4,
    name: 'Maintenance',
    description: 'Routine and emergency maintenance services.',
    price: 'Kshs 1000.00 per visit',
    availability: 'Subject to scheduling'
  },
];

const ServiceRequestForm = () => {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic
    toast({
      title: "Request submitted.",
      description: "We have received your service request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={6}
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Your name" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Your email" />
        </FormControl>
        <FormControl id="service" isRequired>
          <FormLabel>Service</FormLabel>
          <Input type="text" placeholder="Service you need" />
        </FormControl>
        <FormControl id="details" isRequired>
          <FormLabel>Details</FormLabel>
          <Textarea placeholder="Describe your request in detail" />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Submit Request
        </Button>
      </VStack>
    </Box>
  );
};

const Services = () => {
  return (
    <Box p={6}>
      <Heading as="h1" mb={6}>
        Our Services
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
        {services.map((service) => (
          <Box key={service.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">{service.name}</Heading>
            <Text mt={4}>{service.description}</Text>
            <Text mt={2} fontWeight="bold">Price: {service.price}</Text>
            <Badge mt={2} colorScheme={service.availability === 'Available' ? 'green' : 'orange'}>
              {service.availability}
            </Badge>
          </Box>
        ))}
      </SimpleGrid>
      <Heading as="h2" size="lg" mb={4}>
        Request a Service
      </Heading>
      <ServiceRequestForm />
    </Box>
  );
};

export default Services;
