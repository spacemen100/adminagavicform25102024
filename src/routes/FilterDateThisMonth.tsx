// src/routes/FilterDateThisMonth.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Box, Button } from '@chakra-ui/react';
import { unparse } from 'papaparse';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

const FilterDateThisMonth: React.FC = () => {
    // eslint-disable-next-line
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('form_responses')
          .select('*');

        if (error) {
          throw error;
        }

        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();

        const filtered = data.filter(row => {
          const rowDate = dayjs(row.created_at);
          return rowDate.month() === currentMonth && rowDate.year() === currentYear;
        });

        setData(data);
        setFilteredData(filtered);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    try {
      const csv = unparse(filteredData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'data_this_month.csv');
    } catch (err) {
      console.error('Error converting data to CSV:', err);
    }
  };

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box>
      <Button onClick={downloadCSV} mb={4}>
        Download CSV (Date ce mois-ci)
      </Button>
    </Box>
  );
};

export default FilterDateThisMonth;
