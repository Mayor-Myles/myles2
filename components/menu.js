import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, GridItem, Text, ChakraProvider, useMediaQuery, Center, Spinner } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineWifi, AiOutlineMobile, AiOutlineMessage, AiOutlineThunderbolt, AiOutlineUser, AiOutlineWallet, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaExchangeAlt} from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData, page, switchData, pageLoading, mode } from '../components/recoil';
//import Data from '../pages/buy_data';
import {FaSackDollar,FaPersonCirclePlus,FaWallet,FaPhoneVolume,FaWifi} from "react-icons/fa6";

export default function Menu() {
  const data = useRecoilValue(userData);
  const thisPage = useRecoilValue(page);
  const setPage = useSetRecoilState(page);
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const router = useRouter();

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

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const openBuyData = () => {
    setLoadingPage(true);
    router.push("/buy_data");
  };

  const openFund = () => {
    setLoadingPage(true);
    router.push('/fundWallet');
  };

  const openAirtime = () => {
    setLoadingPage(true);
    router.push('/airtime');
  };

  const openHire = () => {
    setLoadingPage(true);
    router.push('/hire_me');
  };

  const openBulkSMS = () => {
    setLoadingPage(true);
    router.push('/bulkSMS');
  };

  const comingSoon= () => {
    showAlert("We are sorry this service is not available. Check back again later...", "info");
  };

  const openAirtime2Cash = () => {
    setLoadingPage(true);
    router.push("/airtime_to_cash");
  }

  return (
    <>
      <ChakraProvider>
        {loadingPage ? (
          <Center mt={5} height="">
            <Box
              p={4}
              maxW="md"
              borderWidth=",0px"
              borderColor="#657ce0"
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
              bg={currentMode === "dark" && "black"}
            >
              <Spinner color="#657ce0" size="lg" />
              <p></p>
            </Box>
          </Center>
        ) : (
          <Box mt={6}>
            <Box maxW="md" mx="auto" p={2}>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem colSpan={1} onClick={openBuyData} cursor="pointer">
                <Box
         border={currentMode==="dark" && "0em solid #657ce0"}         textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={2}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWifi color="#657ce0" size={27} />
                  <Text cursor="pointer" color={currentMode ==="dark" && "white"} mt={2} fontSize="0.7em" fontWeight="bold">
                    Buy Data
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1} onClick={openFund} cursor="pointer">
                <Box
                
                  border={currentMode ==="dark" && "solid 0em #547ce0"}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={2}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaWallet color="#657ce0" size={27} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.7em" fontWeight="bold">
                    Fund
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode === "dark" && "solid 0em #657ce0" } onClick={openAirtime}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={2}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaPhoneVolume color="#657ce0" size={27} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.7em" fontWeight="bold">
                    Airtime
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0em #647ce0"}
                  
                  onClick={openAirtime2Cash}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={2}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaExchangeAlt color="#657ce0" size={27} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.7em" fontWeight="bold">
                    Airtime 2 Cash
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0em #647ce0"}
                  
                  onClick={openBulkSMS}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={2}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaMessage color="#657ce0" size={27} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.7em" fontWeight="bold">
                    Bulk SMS
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0em #657ce0"} onClick={openHire}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={2}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaPersonCirclePlus color="#657ce0" size={27} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.7em" fontWeight="bold">
                    Hire
                  </Text>
                </Box>
              </GridItem>

<GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0em #647ce0"}
                  
                  onClick={comingSoon}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="sm"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaSackDollar color="#657ce0" size={27} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.7em" fontWeight="bold">
                    Refer 
                  </Text>
                </Box>
              </GridItem>
            </Grid>
            </Box>
          </Box>
        )}
      </ChakraProvider>
      <ToastContainer />
    </>
  );
}
