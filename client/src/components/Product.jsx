import { Box, Image, Badge, Grid, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const allProducts = [
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
    imageAlt: 'Bamburi Fundi Cement',
    quantity: 10,
    price: 760.0,
    description:
      'Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
    name: 'Bamburi Fundi Cement',
    formattedPrice: 'kshs 760.00',
    rating: 4,
    numReviews: 10,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629096/GEOCEL/Steel_Nail_3%22.jpg',
    imageAlt: 'Nails 3 inches',
    quantity: 50,
    price: 250.0,
    description: 'High-quality 3-inch nails for various construction needs.',
    name: 'Per Kg Nails 3 inches',
    formattedPrice: 'kshs 250.00',
    rating: 4.5,
    numReviews: 30,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718627953/GEOCEL/Juakali_wheelbarrow.jpg',
    imageAlt: 'Wheelbarrow',
    quantity: 5,
    price: 2500.0,
    description: 'Sturdy wheelbarrow for transporting materials around the construction site.',
    name: 'Wheelbarrow',
    formattedPrice: 'kshs 2500.00',
    rating: 4.8,
    numReviews: 15,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629200/GEOCEL/Shovel.jpg',
    imageAlt: 'Shovel',
    quantity: 20,
    price: 1200.0,
    description: 'Durable shovel for digging and moving bulk materials.',
    name: 'Shovel',
    formattedPrice: 'kshs 1200.00',
    rating: 4.6,
    numReviews: 25,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629253/GEOCEL/Hammer.jpg',
    imageAlt: 'Hammer',
    quantity: 15,
    price: 800.0,
    description: 'Heavy-duty hammer for all your construction needs.',
    name: 'Hammer',
    formattedPrice: 'kshs 800.00',
    rating: 4.7,
    numReviews: 22,
  },
  // Add more products as needed
];

export default function Product() {
  const [visibleProducts, setVisibleProducts] = useState(4);

  const handleShowMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 4);
  };

  return (
    <Box p={6}>
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
        {allProducts.slice(0, visibleProducts).map((product, index) => (
          <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box width="100%" height="250px"> {/* Increased height */}
              <Image src={product.imageUrl} alt={product.imageAlt} width="100%" height="100%" objectFit="cover" />
            </Box>
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {product.formattedPrice}
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {product.quantity} available
                </Box>
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {product.name}
              </Box>
              <Box mt="1" letterSpacing="wide" fontSize="sm" lineHeight="tight">
                {product.description}
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>
      {visibleProducts < allProducts.length && (
        <Box textAlign="center" mt={6}>
          <Button onClick={handleShowMore} colorScheme="blue">
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
}
