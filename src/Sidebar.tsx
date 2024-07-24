// src/Sidebar.tsx
import React from 'react';
import { Box, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box
      as="nav"
      w="200px"
      p="5"
      bg="gray.100"
      h="100vh"
      position="fixed"
      top={0}
      left={0}
      zIndex={10} // Assurez-vous que le z-index est suffisamment élevé
    >
      <VStack spacing="5" align="start">
        <Link as={RouterLink} to="/">
          Home
        </Link>
        <Link as={RouterLink} to="/excel-table">
          Tableau Excel
        </Link>
        <Link as={RouterLink} to="/supabase-table-design">
          Supabase Table Design
        </Link>
        <Link as={RouterLink} to="/supabase-table">
          Supabase Table
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
