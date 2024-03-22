import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, GridItem, Text, ChakraProvider, useMediaQuery, Center, Spinner } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineWifi, AiOutlineMobile, AiOutlineMessage, AiOutlineThunderbolt, AiOutlineUser, AiOutlineWallet, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData, page, switchData, pageLoading, mode } from '../components/recoil';
//import Data from '../pages/buy_data';

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
   alert("curr is "+currentMode);
    alert(userChoice);
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

  const openCable = () => {
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
            <Box maxW="md" mx="auto" p={4}>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem colSpan={1} onClick={openBuyData} cursor="pointer">
                <Box
         border={currentMode==="dark" && "0.1em solid #657ce0"}         textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineWifi color="#657ce0" size={24} />
                  <Text cursor="pointer" color={currentMode ==="dark" && "white"} mt={2} fontSize="sm" fontWeight="bold">
                    Buy Data
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1} onClick={openFund} cursor="pointer">
                <Box
                
                  border={currentMode ==="dark" && "solid 0.1em #547ce0"}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineDollarCircle color="#657ce0" size={24} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
                    Fund
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode === "dark" && "solid 0.1em #657ce0" } onClick={openAirtime}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineMobile color="#657ce0" size={24} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
                    Airtime
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0.1em #647ce0"}
                  
                  onClick={openAirtime2Cash}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FaExchangeAlt color="#657ce0" size={24} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="0.8em" fontWeight="bold">
                    Airtime 2 Cash
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0.1em #647ce0"}
                  
                  onClick={openBulkSMS}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineMessage color="#657ce0" size={24} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
                    Bulk SMS
                  </Text>
                </Box>
              </GridItem>

              <GridItem colSpan={1}>
                <Box border={currentMode==="dark" && "solid 0.1em #657ce0"} onClick={openHire}
                  textAlign="center"
                  borderRadius="15%"
                  boxShadow="md"
                  p={4}
                  _hover={{ boxShadow: 'xl' }}
                  width={isDesktop ? "100px" : "100%"}
                  height={isDesktop ? " 100px" : "100%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AiOutlineUser color="#657ce0" size={24} />
                  <Text color={currentMode === "dark" && "white"} cursor="pointer" mt={2} fontSize="sm" fontWeight="bold">
                    Hire
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
