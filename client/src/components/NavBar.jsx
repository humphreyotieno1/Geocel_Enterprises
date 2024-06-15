import React from 'react';
import { Box, Flex, Link, IconButton, useDisclosure, Icon, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="gray.800"
      color="white"
      py={3}
      w="100%"
      position="fixed"
      top={0}
      left={0}
      zIndex={1000} // Ensure the navbar is above other content
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        maxW="100vw"
        px={4}
      >
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          maxW="1200px"
          mx="auto"
        >
          {/* Left section: Logo and company name */}
          <Flex align="center">
            <Image src="/vite.svg" alt="Geocel" boxSize="32px" mr={2} />
            <Link href="/" fontWeight="bold" fontSize="xl">
              GEOCEL LTD
            </Link>
          </Flex>

          {/* Center section: Navigation links */}
          <Flex
            align="center"
            justify="center"
            flex="1"
            display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
            flexDirection={{ base: 'column', md: 'row' }}
            mt={{ base: 4, md: 0 }}
            mx={{ md: 'auto' }}
          >
            <Link href="/" mx={2} _hover={{ color: 'gray.400' }}>
              Home
            </Link>
            <Link href="/products" mx={2} _hover={{ color: 'gray.400' }}>
              Products
            </Link>
            <Link href="/services" mx={2} _hover={{ color: 'gray.400' }}>
              Services
            </Link>
            <Link href="/about" mx={2} _hover={{ color: 'gray.400' }}>
              About Us
            </Link>
            <Link href="/contact" mx={2} _hover={{ color: 'gray.400' }}>
              Contact Us
            </Link>
          </Flex>

          {/* Right section: Search and cart links */}
          <Flex align="center">
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Toggle navigation"
              onClick={isOpen ? onClose : onOpen}
              display={{ base: 'block', md: 'none' }}
              ml="auto"
            />
            <Flex display={{ base: 'none', md: 'flex' }} align="center">
              <Link href="/search" mx={2} _hover={{ color: 'gray.400' }}>
                <Icon as={SearchIcon} />
              </Link>
              <Link href="/cart" mx={2} _hover={{ color: 'gray.400' }}>
                <Icon as={ViewIcon} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
