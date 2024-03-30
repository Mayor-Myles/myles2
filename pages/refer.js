import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FiShare2, FiSun, FiMoon } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageLoading, thisPage, mode } from "../components/recoil";
import Header from "../components/header.js"; // Import Header component
import NavbarBottom from "../components/navbarBottom.js"; // Import NavbarBottom component

const Refer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [copied, setCopied] = useState(false);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);

  useEffect(() => {
    if (!currentMode) {
      setMode("light"); // Setting a default mode if currentMode is not available
    }
  }, [currentMode, setMode]);

  useEffect(() => {
    const userChoice = localStorage.getItem("mode"); // Access localStorage directly without window object

    if (userChoice === "dark" || userChoice === "light") {
      setMode(userChoice);
    }
  }, [setMode]);

  useEffect(() => {
    setLoadingPage(false);
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText('Your referral link here');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <ChakraProvider>
      <Header /> {/* Include Header component */}
      <Box minHeight="100vh"> {/* Make the screen full height */}
        <Container maxW="lg">
          <Center mt={8}>
            <Box p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg={currentMode === 'light' ? 'white' : 'gray.800'}>
              <Heading mb={4} textAlign="center" color="dodgerblue">
                Refer & Earn
              </Heading>
              <Text textAlign="center" mb={4}>
                Share your referral link with friends and earn rewards!
              </Text>
              <Flex justifyContent="center" alignItems="center" mb={4}>
                <Box flex="1">
                  <Text textAlign="center" fontWeight="bold" color="gray.600">
                    Your Referral Link
                  </Text>
                  <Text textAlign="center" mt={2} color="gray.500">
                    Your referral link here
                  </Text>
                </Box>
                <IconButton
                  icon={<FiShare2 />}
                  aria-label="Copy Referral Link"
                  ml={2}
                  onClick={handleCopy}
                  colorScheme="dodgerblue"
                  variant="ghost"
                />
              </Flex>
              {copied && (
                <Text textAlign="center" color="green.500" fontSize="sm">
                  Copied to clipboard!
                </Text>
              )}
              <Button
                mt={4}
                colorScheme="dodgerblue"
                variant="solid"
                w="full"
                onClick={() => alert('Redirect to share options')}
              >
                Share Now
              </Button>
            </Box>
          </Center>
        </Container>
      </Box>
      <NavbarBottom /> {/* Include NavbarBottom component */}
      <IconButton
        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
        aria-label="Toggle Dark Mode"
        position="fixed"
        bottom="4"
        right="4"
        onClick={toggleColorMode}
        colorScheme="dodgerblue"
      />
    </ChakraProvider>
  );
};

export default Refer;
