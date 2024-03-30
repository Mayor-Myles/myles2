import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  VStack,
  Container,
  Select,
  ChakraProvider,
  extendTheme,
  Center,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { FiCreditCard, FiSend } from 'react-icons/fi';
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import Head from "next/head";
import { thisPage, pageLoading, mode } from "../components/recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";

const theme = extendTheme({
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Helvetica Neue, sans-serif',
  },
});

function Airtime2Cash() {
  const [network, setNetwork] = useState();
  const [charge, setCharge] = useState(0);
  const [networkCharges, setNetworkCharges] = useState({});
  const [amount, setAmount] = useState(0);
  const [whatsapp, setWhatsapp] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);

  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);

  useEffect(() => {

    const userChoice = window.localStorage.getItem("mode");

    if (userChoice === "dark") {
      setMode("dark");
    } else {
      setMode("light");
    }

  }, []);

  useEffect(() => {
    setCurrentPage("buy_data");
    setLoadingPage(false);

  }, []);

  useEffect(() => {
    setLoadingPage(false);
    setCurrentPage("a2c");
  }, []);

  useEffect(() => {
    if (!network) {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (response) {
          const data = response.data;
          const mtnCharge = data.mtnCharge / 100;
          const gloCharge = data.gloCharge / 100;
          const airtelCharge = data.airtelCharge / 100;
          setNetworkCharges({ mtn: mtnCharge, glo: gloCharge, airtel: airtelCharge });

          if (network === "mtn") {
            setCharge(mtnCharge);
          } else if (network === "glo") {
            setCharge(gloCharge);
          } else {
            setCharge(airtelCharge);
          }
        },
        error: function (error) {
          console.log("Server is down", "warning");
        }
      });
    }
  }, [network, setNetwork, charge, setCharge]);

  useEffect(() => {
    setPaidAmount(charge * amount);
  }, [charge, amount]);

  const convert = () => {
    if (amount < 500) {
      showAlert("Amount must be greater than 500", "warning");
      return;
    }
    setBtnLoading(true);

    const url = 'https://mylesvtu.com.ng/app/store/airtime2cash';

    const data = {
      amount: amount,
      whatsapp: whatsapp,
      network: network,
    };

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      success: function (response) {
        const result = response;
        if (result.status === 1) {
          showAlert('Your request has been processed!! Our agent will get in touch with you very shortly. Please make sure your phone number is available', 'success');
          setBtnLoading(false);
        } else {
          showAlert(result.msg, 'info');
        }
      },
      error: function (error) {
        showAlert('Your request cannot be processed. Please try again.', 'info');
        setBtnLoading(false);
      }
    });
  };

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    setBtnLoading(false);
  }

  return (
    <>
      <Head>
        {/* Meta tags */}
      </Head>
      <Header />
      <ChakraProvider theme={theme}>
        {loadingPage ? (
          <Container bg={currentMode === "dark" && "black"} h="100vh" maxW="lg" height="100vh"><Center><Flex justifyContent="center" alignItems="center" p="1em" shadow="sm"><Spinner position="absolute" top="40%" color="#657ce0" size="xl" /></Flex></Center></Container>
        ) : currentMode !== 'light' && currentMode !== 'dark' ? (
          <> </> // Empty view when mode is not known
        ) : (
          <Container maxW="100vw" h="100vh" color={currentMode === "dark" && "white"} bg={currentMode == "dark" && "black"} m={0}>
            <Box h="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={3} borderWidth="0px" borderRadius="lg" shadow="sm">
              <Heading size="sm" mb={4}>
                Airtime 2 Cash
              </Heading>
              <Container boxShadow={0} mb={4}>
                 Only reply a message from <Text color="dodgerblue" fontWeight="bold" fontSize="md">07014443158</Text> about this transaction.. Be warned!!! Payment for MTN is {networkCharges && (`${networkCharges.mtn * 100}% Glo is ${networkCharges.glo * 100}% and Airtel is ${networkCharges.airtel * 100}%`)}
              </Container>
              <VStack spacing={5}>
                <FormControl id="amount">
                     <InputGroup>
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <InputLeftElement pointerEvents="none">
                      <FiCreditCard size="1.5em" />
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
                <Select onChange={(e) => setNetwork(e.target.value)} placeholder='Airtime Network'>
                  <option value='mtn'>MTN</option>
                  <option value='glo'>Glo</option>
                  <option value='airtel'>Airtel</option>
                  <option value="9mobile">9Mobile</option>
                </Select>
                <FormControl id="whatsapp">
                     <InputGroup>
                    <Input
                      bg={currentMode === "dark" && "black" }
                      type="tel"
                      placeholder="Enter WhatsApp Number"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                    <InputLeftElement pointerEvents="none">
                      <FiSend size="1.5em" />
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>
                {network && (
                  <FormControl id="paidAmount">
                    <FormLabel>Amount we would pay you:</FormLabel>
                    <Input
                      type="text"
                      value={paidAmount}
                      isReadOnly
                    />
                  </FormControl>
                )}
                {network && amount && whatsapp && (
                  <Button
                    bg="dodgerblue"
                    onClick={convert}
                    isLoading={btnLoading}
                    size="md"
                    w="20em"
                    _hover={{opacity:0.8,bg:"dodgerblue"}}
                    color="white"
                  >
                    Convert
                  </Button>
                )}
              </VStack>
            </Box>
            <ToastContainer />
          </Container>
        )}

      </ChakraProvider>
      <NavbarBottom />
    </>
  );
}

export default Airtime2Cash;
