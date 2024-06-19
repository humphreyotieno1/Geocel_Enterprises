import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import motion component for animations

const About = () => {
  // Animation settings for cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Box p={6}>
      <Heading as="h1" mb={6} fontWeight="bold" fontSize="3xl">
        About Us
      </Heading>

      <VStack spacing={10} align="start">
        <Box>
          <Heading as="h2" mb={4} fontWeight="bold" fontSize="2xl">
            Company History
          </Heading>
          <Text fontSize="lg">
            Geocel Enterprises was founded in 2012 by George Ouma. Starting as a small family business, it has grown into a leading provider of hardware and construction services in the region. Over the years, Geocel Enterprises has expanded its offerings and built a reputation for quality and reliability.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" mb={4} fontWeight="bold" fontSize="2xl">
            Core Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {[
              { title: 'Integrity', description: 'We conduct our business with the highest standards of professionalism and ethical behavior.' },
              { title: 'Quality', description: 'We are committed to providing top-quality products and services to our customers.' },
              { title: 'Customer Focus', description: 'Our customers are at the center of everything we do.' },
              { title: 'Innovation', description: 'We continuously seek new ways to improve our products and services.' },
            ].map((value, index) => (
              <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.2 }}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md" _hover={{ boxShadow: "xl" }}>
                  <Heading as="h3" size="md" mb={2}>{value.title}</Heading>
                  <Text fontSize="lg">{value.description}</Text>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" mb={4} fontWeight="bold" fontSize="2xl">
            Leadership Team
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {[
              { name: 'George Ouma', role: 'Founder & CEO', image: '/path/to/john_doe.jpg', alt: 'george' },
              { name: 'Celestine Wagumba', role: 'Founder', image: '/path/to/jane_doe.jpg', alt: 'celestine' },
              { name: 'Richard Roe', role: 'Manager', image: '/path/to/richard_roe.jpg', alt: 'richard' },
            ].map((leader, index) => (
              <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.2 }}>
                <Box textAlign="center" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md" _hover={{ boxShadow: "xl" }}>
                  <Image borderRadius="full" boxSize="150px" src={leader.image} alt={leader.alt} mb={4} />
                  <Heading as="h3" size="md">{leader.name}</Heading>
                  <Text fontSize="lg">{leader.role}</Text>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" mb={4} fontWeight="bold" fontSize="2xl">
            Achievements and Milestones
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {[
              { year: '1990', achievement: 'Geocel Enterprises was founded.' },
              { year: '2000', achievement: 'Expanded to a second location.' },
              { year: '2010', achievement: 'Reached $10 million in annual revenue.' },
              { year: '2020', achievement: 'Awarded "Best Hardware Supplier" in the region.' },
            ].map((milestone, index) => (
              <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.2 }}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} boxShadow="md" _hover={{ boxShadow: "xl" }}>
                  <Text fontSize="lg" mb={2}>
                    <strong>{milestone.year}:</strong> {milestone.achievement}
                  </Text>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
