// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Home from './routes/Home';
import ExcelTable from './routes/ExcelTable';
import SupabaseTable from './routes/SupabaseTable';
import SupabaseTableDesign from './routes/SupabaseTableDesign';
import FilterAmountLessThan1000 from './routes/FilterAmountLessThan1000';
import FilterAmountGreaterThan1000 from './routes/FilterAmountGreaterThan1000';
import FilterDateThisMonth from './routes/FilterDateThisMonth';

const App: React.FC = () => {
  return (
    <Router>
      <Flex>
        <Sidebar />
        <Box ml="200px" flex="1" p="5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/excel-table" element={<ExcelTable />} />
            <Route path="/supabase-table" element={<SupabaseTable />} />
            <Route path="/supabase-table-design" element={<SupabaseTableDesign />} />
            <Route path="/filter-amount-less-than-1000" element={<FilterAmountLessThan1000 />} />
            <Route path="/filter-amount-greater-than-1000" element={<FilterAmountGreaterThan1000 />} />
            <Route path="/filter-date-this-month" element={<FilterDateThisMonth />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
};

export default App;
