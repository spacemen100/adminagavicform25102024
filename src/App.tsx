// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const App: React.FC = () => {
  return (
    <Router>
      <Flex>
        <Sidebar />
        <Box flex="1" p="5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
};

export default App;
