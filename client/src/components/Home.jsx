import React, { useEffect, useRef } from 'react';
import { Box, Flex, Heading, Text, Button, Image, VStack, useColorModeValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

const HomePage = () => {
  const controls = useAnimation();
  const titleControls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      await controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      });
      await titleControls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2,
        },
      });
    };
    animation();
  }, [controls, titleControls]);

  return (
    <Box>
      <Flex
        as={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={controls}
        direction="column"
        position="relative"
      >
        <Image
          src="/geocel.jpg"
          alt="Geocel Enterprises Hardware"
          width="100%"
          height="auto"
          borderRadius="none"
          boxShadow="none"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
          padding={8}
          borderRadius="lg"
          textAlign="center"
        >
          <Text
            as={motion.div}
            initial={{ x: -100, opacity: 0 }}
            animate={titleControls}
            fontSize="4xl"
            fontWeight="bold"
            mb={4}
          >
            Geocel Enterprises Hardware
          </Text>
          <Text fontSize="2xl" color={useColorModeValue('gray.600', 'gray.400')}>
            Where innovation meets excellence
          </Text>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} mt={4}>
            Welcome to Geocel Enterprises Hardware, a leading provider of quality products and services.
            We are dedicated to delivering exceptional solutions that meet the needs of our valued customers.
          </Text>
          <Button
            as="a"
            href="/products"
            colorScheme="blue"
            size="lg"
            fontWeight="bold"
            mt={6}
          >
            Shop Now
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;