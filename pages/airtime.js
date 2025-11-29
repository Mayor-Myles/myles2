import { Box, Button, Flex, Heading, Text, VStack, HStack, IconButton, Divider } from '@chakra-ui/react';
import { FaHome, FaMoneyBill, FaHistory, FaUser } from 'react-icons/fa';

const transactions = [
  {
    title: 'MTN Data',
    time: 'Today, 1:15 PM',
    amount: '-N250.78',
    description: '1GB SME',
  },
  {
    title: 'GLO Airtime',
    time: 'Today, 9:00 AM',
    amount: '-N150.00',
    description: 'Airtime',
  },
  {
    title: 'TV Subscription',
    time: '',
    amount: '-N354.90',
    description: '',
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50" p={4}>
      {/* Balance Section */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="md" mb={4}>
        <Heading size="md" mb={2}>Available Balance</Heading>
        <Text fontSize="2xl" fontWeight="bold" color="green.500">N 11,3466.60</Text>
        <HStack spacing={4} mt={4}>
          <Button colorScheme="blue">Buy Data</Button>
          <Button colorScheme="teal">Buy Airtime</Button>
          <Button colorScheme="gray">Add Money</Button>
        </HStack>
      </Box>

      {/* Recent Transactions */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="md" flex="1">
        <Heading size="md" mb={4}>Recent</Heading>
        <VStack spacing={4} align="stretch">
          {transactions.map((tx, index) => (
            <Box key={index}>
              <Flex justify="space-between">
                <Text fontWeight="semibold">{tx.title}</Text>
                <Text color="red.500">{tx.amount}</Text>
              </Flex>
              {tx.time && <Text fontSize="sm" color="gray.500">{tx.time}</Text>}
              {tx.description && <Text fontSize="sm" color="gray.600">{tx.description}</Text>}
              {index < transactions.length - 1 && <Divider mt={2} />}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Bottom Navigation */}
      <Flex justify="space-around" bg="white" p={2} mt={4} borderRadius="md" boxShadow="md">
        <IconButton aria-label="Home" icon={<FaHome />} variant="ghost" />
        <IconButton aria-label="Pay Bills" icon={<FaMoneyBill />} variant="ghost" />
        <IconButton aria-label="History" icon={<FaHistory />} variant="ghost" />
        <IconButton aria-label="Profile" icon={<FaUser />} variant="ghost" />
      </Flex>
    </Flex>
  );
}
