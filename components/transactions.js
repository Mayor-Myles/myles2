import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Flex,
  Box,
  Heading,
  Text,
  Center,
  Spinner,
  useMediaQuery,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

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
    <Box bg={currentMode == "dark" && "black"}>
      <Flex
        bg={currentMode === 'dark' ? 'black' : ''}
        mt={2}
        as={isDesktop ? 'center' : ''}
        justifyContent="center"
        alignItems="center"
        flexDirection={isDesktop ? 'row' : 'column'}
      >
        <Text fontWeight="bold" fontSize="0.8em"> Transactions</Text>
      </Flex>
      <Box
        justifyContent="center"
        alignItems="center"
        mb={0}
        p={3}
        borderRadius="lg"
        boxShadow="lg"
        bg={currentMode === 'dark' ? 'black' : ''}
        color={currentMode === 'dark' ? 'white' : ''}
        marginTop={1}
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
            bg={currentMode === 'dark' ? 'gray.800' : 'white'}
            color={currentMode === 'dark' ? 'white' : 'black'}
            p={4}
            mb={4}
            alignItems="center"
            cursor="pointer"
            onClick={() => handleTransactionClick(item)}
          >
            <Box
              w="12px"
              h="12px"
              borderRadius="full"
              bg="blue.200"
              mr={4}
              flexShrink={0}
            />
            <Box flex="1">
              <Heading as="h4" size="sm" mb={1}>{item.details}</Heading>
              <Text fontSize="sm" mb={1}>Transaction ID: {item.tid}</Text>
              <Text fontSize="sm" mb={1}>Amount(₦): {item.amount}</Text>
              <Text fontSize="sm" mb={1}>Order date: {item.date}</Text>
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
      <Modal bg={currentMode=="dark" && "black"} m={2} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTransaction && (
              <>
                <Text mb={2}><strong>Transaction ID:</strong> {selectedTransaction.tid}</Text>
                <Text mb={2}><strong>Description:</strong> {selectedTransaction.details}</Text>
                <Text mb={2}><strong>Amount(₦):</strong> {selectedTransaction.amount}</Text>
                <Text mb={2}><strong>Order Date:</strong> {selectedTransaction.date}</Text>
                {/* Add more details here if needed */}
           <Box shadow="md">
<Button bg="#657ce0" size="xl" borderRadius="xl">Report this Transaction</Button>
                 </Box>
                 </>
                 
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
        </Box>
    </ChakraProvider>
  );
};

export default Transactions;
