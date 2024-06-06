import { Box, Image, Badge } from '@chakra-ui/react';
import React from 'react';

export default function Product() {
  const property = {
    imageUrl: 'https://shorturl.at/jw8fY',
    imageAlt: 'Bamburi Fundi Cement',
    quantity: 10,
    price: 760.0,
    description:
      'Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
    name: 'Bamburi Fundi Cement',
    formattedPrice: 'kshs 760.00',
    rating: 4,
    numReviews: 10,
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {property.formattedPrice}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.quantity} available
          </Box>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {property.name}
        </Box>
        <Box mt="1" letterSpacing="wide" fontSize="sm" lineHeight="tight">
          {property.description}
        </Box>
      </Box>
    </Box>
  );
}