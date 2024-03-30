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
    <>
    <ChakraProvider>
  
      <Header /> {/* Include Header component */}
    
        <Container bg={currentMode == "dark" && "black" } h="100vh" maxW="100vw">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box maxW="550px" h="80vh" p={8} borderWidth="0px" borderRadius="lg" boxShadow="sm" bg={currentMode === 'light' ? 'white' : 'black'}>
              <Heading mb={4} textAlign="center" color="dodgerblue">
                Refer & Earn!
              </Heading>
              <Text color={currentMode=="dark" && "white"} textAlign="center" mb={4}>
                Bring us a client for <b>Graphics Design</b> or <b>Website development</b> project and get paid immediately your refferal pays us!!! There is no limit to the number of clients you can bring. The more you bring the more you earn. All you need to do is to tell your refferal to use our <b>"Hire Me"</b> menu and then input your referral code. Contact us for more information... 
              </Text>
              <Flex justifyContent="center" alignItems="center" mb={4}>
                <Box flex="1">
                  <Text textAlign="center" fontWeight="bold" color="gray.600">
                    Your Referral Code
                  </Text>
                  <Text textAlign="center" mt={2} color="gray.500">
                    AXDQNY23
                  </Text>
                </Box>
                <IconButton
                  icon={<FiShare2 />}
                  aria-label="Copy Referral Link"
                  ml={2}
                  onClick={handleCopy}
                  colorScheme="blue"
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
                bg="dodgerblue"
                color="white"
                variant="solid"
                w="full"
                onClick={handleCopy}
              >
                Copy Referral code
              </Button>
            </Box>
    </Box>
        </Container>
      
           </ChakraProvider>
<NavbarBottom />
    </>
  );
};

export default Refer;
