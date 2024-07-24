// src/SupabaseTableDesign.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const SupabaseTableDesign: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // État pour la ligne sélectionnée

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
        return 'Date de naissance';
      case 'step6':
        return 'Êtes-vous résident fiscal français ?';
      case 'step7':
        return 'Avez-vous une préférence pour des investissements respectant les critères environnementaux, sociaux et de gouvernance (ESG) ?';
      case 'step8':
        return 'Combien d\'enfants avez-vous à charge ?';
      case 'step9':
        return 'Quels sont les revenus annuels bruts de votre foyer ?';
      case 'step10':
        return 'Êtes-vous propriétaire de votre résidence principale ?';
      case 'step11':
        return 'Quel est le montant de votre loyer mensuel ou crédit immobilier ?';
      case 'step12':
        return 'Quelle est la valeur de votre patrimoine immobilier NET ?';
      case 'step13':
        return 'Quel est le montant estimé de votre patrimoine financier ?';
      case 'step14':
        return 'Combien arrivez-vous à mettre de côté en fin de mois ?';
      case 'step15':
        return 'Pourriez-vous avoir besoin de toute l\'épargne placée chez PatriLife d\'ici 2 ans ?';
      case 'step16':
        return 'Pourriez-vous avoir besoin de la moitié de votre investissement avant 25 ans ?';
      case 'step17':
        return 'Avez-vous déjà placé de l\'argent sur un contrat d\'assurance-vie, un compte-titres ou un plan d\'épargne en actions (PEA) ?';
      case 'step18':
        return 'Une perspective de gain élevé implique un risque de perte en capital fort';
      case 'step19':
        return 'Un ETF est un fonds à capital garanti';
      case 'step20':
        return 'En déléguant la gestion de mon portefeuille à une société de gestion, je renonce à prendre moi-même les décisions d’investissement sur celui-ci';
      case 'step21':
        return 'Avez-vous déjà subi des pertes sur vos placements financiers ?';
      case 'step22':
        return 'Quel rapport gains / pertes êtes-vous prêt à accepter en investissant 10 000 € sur 5 ans ?';
      case 'step23':
        return 'Quel rapport gains / pertes êtes-vous prêt à accepter en investissant sur 10 ans ?';
      case 'step24':
        return 'Si votre investissement perd 10% de sa valeur en 3 mois. Que faites-vous ?';
      case 'step25':
        return 'Quelle est votre date de naissance ?';
      case 'step26':
        return 'Informations de contact';
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
    <Box overflowX="auto" overflowY="auto" height="100vh">
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header} position="sticky" top={0} bg="white" zIndex={5}>{renderHeader(header)}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr
              key={index}
              onClick={() => setSelectedRow(index)}
              bg={selectedRow === index ? 'blue.300' : undefined} // Appliquez une couleur de fond si la ligne est sélectionnée
              cursor="pointer" // Change le curseur pour indiquer que la ligne est cliquable
            >
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
