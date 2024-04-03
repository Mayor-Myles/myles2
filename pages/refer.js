import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
  Spinner
} from '@chakra-ui/react';
import { FiShare2 } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageLoading, thisPage, mode, userData } from "../components/recoil";
import Header from "../components/header.js";
import NavbarBottom from "../components/navbarBottom.js";
import Head from 'next/head';

const Refer = () => {
  const { colorMode } = useColorMode();
  const [copied, setCopied] = useState(false);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);
  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);

  useEffect(() => {
    if (!currentMode) {
      setMode("light");
    }
  }, [currentMode, setMode]);

  useEffect(() => {
    const userChoice = localStorage.getItem("mode");

    if (userChoice === "dark" || userChoice === "light") {
      setMode(userChoice);
    } else {
      setMode("light");
    }
  }, [setMode]);

  useEffect(() => {
    setCurrentPage("refer");
    setLoadingPage(false);
  }, [setCurrentPage, setLoadingPage]);

  const handleCopy = () => {
    navigator.clipboard.writeText('Your referral link here');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const url = 'https://mylesvtu.com.ng/app/store/welcome';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.isLogged) {
          const profile = data.profile;
          setData({ profile: profile });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [setData]);

  return (
    <>
      <Head>
        <title>Refer & Earn | MylesVTU</title>
        <meta name="description" content="Refer clients for cheap data plans, airtime, web development, and graphic design services at MylesVTU and earn rewards. Unlimited earning potential. Learn more!" />
        <meta name="keywords" content="refer and earn, referral program, rewards program, cheap data plans, airtime, web development, graphic design, earn money, earn rewards, MylesVTU" />
        <meta name="author" content="MylesVTU" />
        <meta property="og:title" content="Refer & Earn | MylesVTU" />
        <meta property="og:description" content="Refer clients for cheap data plans, airtime, web development, and graphic design services at MylesVTU and earn rewards. Unlimited earning potential. Learn more!" />
        <meta property="og:url" content="https://mylesvtu.com.ng/refer-and-earn" />
        <meta property="og:image" content="https://mylesvtu.com.ng/images/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Refer & Earn | MylesVTU" />
        <meta name="twitter:description" content="Refer clients for cheap data plans, airtime, web development, and graphic design services at MylesVTU and earn rewards. Unlimited earning potential. Learn more!" />
        <meta name="twitter:url" content="https://mylesvtu.com.ng/refer-and-earn" />
        <meta name="twitter:image" content="https://mylesvtu.com.ng/images/twitter-image.jpg" />
        <link rel="canonical" href="https://mylesvtu.com.ng/refer-and-earn" />
      </Head>
      <ChakraProvider>
        <Header />
        {loadingPage ? (
          <Container h="100vh" maxW="100vw" bg={colorMode === "dark" && "black"}>
            <Box h="80vh" shadow="sm" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Spinner size="xl" color="dodgerblue" />
            </Box>
          </Container>
        ) : (
          <Container bg={currentMode === "dark" && "black"} h="100vh" maxW="100vw">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box maxW="550px" h="80vh" p={8} borderWidth="0px" borderRadius="lg" boxShadow="sm" bg={colorMode === 'light' ? 'white' : 'black'}>
                <Heading mb={4} textAlign="center" color="dodgerblue">
                  Refer & Earn!
                </Heading>
                <Text color={currentMode === "dark" && "white"} textAlign="center" mb={4}>
                  Bring us a client for <b>cheap data plans</b>, <b>airtime</b>, <b>web development</b>, or <b>graphic design</b> services and get rewarded immediately when your referral pays us! There's no limit to the number of clients you can bring. The more you bring, the more you earn. Just ask your referral to use our <b>"Hire Me"</b> menu and input your referral code. Contact us for more information.
                </Text>
                <Flex justifyContent="center" alignItems="center" mb={4}>
                  <Box flex="1">
                    <Text textAlign="center" fontWeight="bold" color="gray.600">
                      Your Referral Code
                    </Text>
                    <Text textAlign="center" mt={2} color="gray.500">
                      {data.profile ? data.profile.referralCode : "AXDQNY23"}
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
        )}
      </ChakraProvider>
      <NavbarBottom />
    </>
  );
};

export default Refer;
