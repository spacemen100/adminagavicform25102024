// src/routes/ExcelTable.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { unparse } from 'papaparse';
import { saveAs } from 'file-saver';

const ExcelTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('form_responses') // Nom de la table
          .select('*');

        if (error) {
          throw error;
        }

        setData(data);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    try {
      const csv = unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'data.csv');
    } catch (err) {
      console.error('Error converting data to CSV:', err);
    }
  };

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  if (data.length === 0) {
    return <Box>Loading...</Box>;
  }

  const headers = Object.keys(data[0]);

  const renderCell = (cellData: any) => {
    if (typeof cellData === 'object' && cellData !== null) {
      return JSON.stringify(cellData);
    }
    return cellData;
  };

  return (
    <Box overflowX="auto">
      <Button onClick={downloadCSV} mb={4}>
        Download CSV
      </Button>
      <Box display="none"> {/* Hide the table from the user */}
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
                  <Td key={header}>{renderCell(row[header])}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ExcelTable;
