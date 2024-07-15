// src/Sidebar.tsx
import React from 'react';
import { Box, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box as="nav" w="200px" p="5" bg="gray.100" h="100vh">
      <VStack spacing="5" align="start">
        <Link as={RouterLink} to="/">
          Home
        </Link>
        <Link as={RouterLink} to="/about">
          About
        </Link>
        <Link as={RouterLink} to="/contact">
          Contact
        </Link>
        <Link as={RouterLink} to="/supabase-table">
          Supabase Table
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
