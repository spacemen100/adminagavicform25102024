// src/SupabaseTableDesign.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const SupabaseTableDesign: React.FC = () => {
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

        // Filtrer les lignes où toutes les colonnes step1 à step20 sont nulles ou vides
        const filteredData = data.filter((row: any) => {
          for (let i = 1; i <= 20; i++) {
            const stepValue = row[`step${i}`];
            if (stepValue !== null && stepValue !== '') {
              return true;
            }
          }
          return false;
        });

        setData(filteredData);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  if (data.length === 0) {
    return <Box>Loading...</Box>;
  }

  const headers = Object.keys(data[0]);

  const renderHeader = (header: string) => {
    switch (header) {
      case 'step1':
        return 'Quel est votre projet d’investissement ?';
      case 'step2':
        return 'Quel montant souhaitez-vous placer chez AGAVIC ?';
      case 'step3':
        return 'Quel montant régulier souhaitez-vous placer chaque mois ?';
      case 'step4':
        return 'Dans combien de temps souhaitez-vous profiter de cet investissement ?';
      case 'step5':
        return 'Êtes-vous résident fiscal français ?';
      case 'step6':
        return 'Avez-vous une préférence pour des investissements respectant les critères environnementaux, sociaux et de gouvernance (ESG) ?';
      case 'step7':
        return 'Combien d\'enfants avez-vous à charge ?';
      case 'step8':
        return 'Quels sont les revenus annuels bruts de votre foyer ?';
      case 'step9':
        return 'Êtes-vous propriétaire de votre résidence principale ?';
      case 'step10':
        return 'Quel est le montant de votre loyer mensuel ou crédit immobilier ?';
      case 'step11':
        return 'Quelle est la valeur de votre patrimoine immobilier NET ?';
      case 'step12':
        return 'Quel est le montant estimé de votre patrimoine financier ?';
      default:
        return header;
    }
  };

  const renderCell = (cellData: any) => {
    if (typeof cellData === 'object' && cellData !== null) {
      return JSON.stringify(cellData);
    }
    return cellData;
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{renderHeader(header)}</Th>
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
  );
};

export default SupabaseTableDesign;
