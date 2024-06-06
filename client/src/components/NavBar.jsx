import { Box, Heading, Image, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/contact' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
];

export default function NavBar() {
    return (
        <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            padding={4}
        >
            <Heading as="h1" size="lg">
                Geocel Enterprises Limited
            </Heading>
            <Box display="flex" justifyContent="space-between">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        activeStyle={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </Box>
        </VStack>
    );
}