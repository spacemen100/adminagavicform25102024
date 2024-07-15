// src/SupabaseTable.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const SupabaseTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('form_responses') // Nom de la table
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <Box>Loading...</Box>;
  }

  const headers = Object.keys(data[0]);

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              {headers.map((header) => (
                <Td key={header}>{row[header]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SupabaseTable;
