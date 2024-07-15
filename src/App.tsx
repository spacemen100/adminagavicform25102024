// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Home from './Home';
import About from './About';
import SupabaseTable from './SupabaseTable';
import SupabaseTableDesign from './SupabaseTableDesign';

const App: React.FC = () => {
  return (
    <Router>
      <Flex>
        <Sidebar />
        <Box ml="200px" flex="1" p="5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/supabase-table" element={<SupabaseTable />} />
            <Route path="/supabase-table-design" element={<SupabaseTableDesign />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
};

export default App;
