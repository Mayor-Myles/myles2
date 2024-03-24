import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Center,
  Text,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData, mode } from '../components/recoil';

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
  const [isDesktop] = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const userChoice = localStorage.getItem('mode');
    setMode(userChoice === 'dark' ? 'dark' : 'light');
  }, [setMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data.profile || !data.profile.transactions) {
          const url = 'https://mylesvtu.com.ng/app/store/welcome';
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const responseData = await response.json();
          const profile = responseData.data.profile;
          const dataBundle = responseData.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle });
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, setData]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (!data || !data.profile || !data.profile.transactions) {
    return (
      <Center h="100vh">
        <Text>No data available</Text>
      </Center>
    );
  }

  const transacs = data.profile.transactions;
  const requests = data.profile.request || [];

  return (
    <ChakraProvider>
      <Flex
        bg={currentMode === 'dark' ? 'black' : ''}
        mt={8}
        as={isDesktop ? 'center' : ''}
        justifyContent="center"
        alignItems="center"
        flexDirection={isDesktop ? 'row' : 'column'}
      >
        
      </Flex>
      <Box
        mb={0}
        p={4}
        borderRadius="lg"
        boxShadow="lg"
        bg={currentMode === 'dark' ? 'black' : ''}
        color={currentMode === 'dark' ? 'white' : ''}
        maxH="400px"
        overflowY="scroll"
        marginTop={2}
        marginBottom="2px"
        ml={isDesktop ? '150px' : ''}
        mr={isDesktop ? '150px' : ''}
        minW={isDesktop ? '500px' : ''}
      >
        <Table variant="simple" colorScheme="gray" size="sm">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Transaction ID</Th>
              <Th>Description</Th>
              <Th>Amount(₦)</Th>
              <Th>Order date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transacs.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.tid}</Td>
                <Td>{item.details}</Td>
                <Td>{item.amount}</Td>
                <Td>{item.date}</Td>
                <Td>
                  <Tag size="sm" variant="solid" colorScheme="green">
                    Success
                  </Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {transacs.length < 1 && (
          <Center m={3}>
            <Text textAlign="center" color="#657ce0">
              No transactions have been made
            </Text>
          </Center>
        )}
      </Box>

      <Box bg={currentMode === 'dark' ? 'black' : ''} mb="0em">
        <Flex
          mt={0}
          as={isDesktop ? 'center' : ''}
          justifyContent="center"
          alignItems="center"
          flexDirection={isDesktop ? 'row' : 'column'}
        >
          <Heading as="h4" size="sm">
            Request History
          </Heading>
        </Flex>

        <Box
          mb={20}
          p={4}
          borderRadius="lg"
          boxShadow="lg"
          bg={currentMode === 'dark' ? 'black' : ''}
          color={currentMode === 'dark' ? 'white' : ''}
          maxH="400px"
          overflowY="scroll"
          marginTop={2}
          marginBottom="2px"
          ml={isDesktop ? '150px' : ''}
          mr={isDesktop ? '150px' : ''}
          minW={isDesktop ? '500px' : ''}
        >
          <Table variant="simple" colorScheme="gray" size="sm">
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Request ID</Th>
                <Th>Description</Th>
                <Th>Whatsapp</Th>
                <Th>Order Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.rid}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.phoneNo}</Td>
                  <Td>{item.date}</Td>
                  <Td>
                    <Tag size="sm" variant="solid" colorScheme="green">
                      Success
                    </Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {requests.length < 1 && (
            <Center m={3}>
              <Text textAlign="center" color="#657ce0">
                No request have been made
              </Text>
            </Center>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Transactions;
