import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Flex,
  Box,
  Heading,
  Text,
  Tag,
  Center,
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

  return (
    <ChakraProvider>
      <Flex
        bg={currentMode === 'dark' ? 'black' : ''}
        mt={2}
        as={isDesktop ? 'center' : ''}
        justifyContent="center"
        alignItems="center"
        flexDirection={isDesktop ? 'row' : 'column'}
      >
        <Text fontWeight="bold" size="sm">Transactions</Text>
      </Flex>
      <Box
        mb={0}
        p={3}
        borderRadius="lg"
        boxShadow="lg"
        bg={currentMode === 'dark' ? 'black' : ''}
        color={currentMode === 'dark' ? 'white' : ''}
        marginTop={2}
        marginBottom=""
        ml={isDesktop ? '150px' : ''}
        mr={isDesktop ? '150px' : ''}
        minW={isDesktop ? '500px' : ''}
      >
        {transacs.map((item, index) => (
          <Flex
            key={index}
            borderRadius="lg"
            boxShadow="md"
            bg={currentMode === 'dark' ? 'gray.700' : 'white'}
            color={currentMode === 'dark' ? 'white' : 'black'}
            p={4}
            mb={4}
            alignItems="center"
          >
            <Box
              w="30px"
              h="30px"
              borderRadius="full"
              bg="blue.500"
              mr={4}
            />
            <Box flex="1">
              <Heading as="h4" size="sm" mb={2}>{item.details}</Heading>
              <Text>Transaction ID: {item.tid}</Text>
              <Text>Amount(₦): {item.amount}</Text>
              <Text>Order date: {item.date}</Text>
              <Tag size="sm" variant="solid" colorScheme="green">
                Success
              </Tag>
            </Box>
          </Flex>
        ))}
        {transacs.length < 1 && (
          <Center m={3}>
            <Text textAlign="center" color="#657ce0">
              No transactions have been made
            </Text>
          </Center>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Transactions;
