import React from 'react';
import { Box, Flex, Heading, Text, Button, Image, VStack } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box>
      <Flex
        bg="gray.100"
        minH="80vh"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
      >
        <VStack spacing={8} align="start">
          <Box>
            <Heading as="h1" size="4xl" mb={2}>
              Geocel Enterprises Limited
            </Heading>
            <Text fontSize="2xl" color="gray.600">
              Where innovation meets excellence
            </Text>
          </Box>
          <Text fontSize="xl" color="gray.600">
            Welcome to Geocel Enterprises Limited, a leading provider of quality products and services.
            We are dedicated to delivering exceptional solutions that meet the needs of our valued customers.
          </Text>
          <Button
            as="a"
            href="/products"
            colorScheme="blue"
            size="lg"
            fontWeight="bold"
          >
            Shop Now
          </Button>
        </VStack>
        <Box ml={8}>
          <Image
            src="./geocel.jpg"
            alt="Geocel Enterprises Limited"
            borderRadius="lg"
            boxShadow="lg"
            maxW={{ base: '100%', md: '400px' }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;