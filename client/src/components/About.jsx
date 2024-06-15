import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Divider
} from '@chakra-ui/react';

const About = () => {
  return (
    <Box p={6}>
      <Heading as="h1" mb={6}>
        About Us
      </Heading>

      <VStack spacing={10} align="start">
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Company History
          </Heading>
          <Text fontSize="lg">
            Geocel Enterprises was founded in 1990 by John Doe. Starting as a small family business, it has grown into a leading provider of hardware and construction services in the region. Over the years, Geocel Enterprises has expanded its offerings and built a reputation for quality and reliability.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Core Values
          </Heading>
          <Text fontSize="lg" mb={2}>
            <strong>Integrity:</strong> We conduct our business with the highest standards of professionalism and ethical behavior.
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>Quality:</strong> We are committed to providing top-quality products and services to our customers.
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>Customer Focus:</strong> Our customers are at the center of everything we do.
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>Innovation:</strong> We continuously seek new ways to improve our products and services.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Leadership Team
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Box textAlign="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="/path/to/john_doe.jpg"
                alt="John Doe"
                mb={4}
              />
              <Heading as="h3" size="md">John Doe</Heading>
              <Text fontSize="lg">Founder & CEO</Text>
            </Box>
            <Box textAlign="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="/path/to/jane_doe.jpg"
                alt="Jane Doe"
                mb={4}
              />
              <Heading as="h3" size="md">Jane Doe</Heading>
              <Text fontSize="lg">Chief Operating Officer</Text>
            </Box>
            <Box textAlign="center">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="/path/to/richard_roe.jpg"
                alt="Richard Roe"
                mb={4}
              />
              <Heading as="h3" size="md">Richard Roe</Heading>
              <Text fontSize="lg">Chief Financial Officer</Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Achievements and Milestones
          </Heading>
          <Text fontSize="lg" mb={2}>
            <strong>1990:</strong> Geocel Enterprises was founded.
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>2000:</strong> Expanded to a second location.
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>2010:</strong> Reached $10 million in annual revenue.
          </Text>
          <Text fontSize="lg" mb={2}>
            <strong>2020:</strong> Awarded "Best Hardware Supplier" in the region.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
