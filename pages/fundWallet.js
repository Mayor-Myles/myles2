import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  ChakraProvider,
  useMediaQuery,
  Grid,
  GridItem,
  Button,
  Center,
  Divider,
  InputGroup,
  InputLeftElement,
  VStack,
  Input,
  Spinner,
  Select,
  Container,
} from '@chakra-ui/react';

import { BiWalletAlt } from 'react-icons/bi';
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";
import Wallet from "../components/wallet";
import Adverts from "../components/adverts";
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import { useRouter } from 'next/router';
import { useSetRecoilState, useRecoilValue } from "recoil";
import Script from "next/script";
import Head from "next/head";
import { loginStatus, thisPage, pageLoading, userData, mode } from "../components/recoil";

export default function Fund() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const setData = useSetRecoilState(userData);
  const data = useRecoilValue(userData);
  const profile = data.profile;
  const [input, setInput] = useState({ fund: "fund" });
  const router = useRouter();
  const [fundData, setFundData] = useState({});
  const [isPicked, setIsPicked] = useState(false);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);

  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);

  const [fundType, setFundType] = useState("");
  const [merchantFee, setMerchantFee] = useState(0);
  const [toPay, setToPay] = useState(0);

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
    setLoadingPage(false);
    setCurrentPage("fundWallet");
  }, []);

  const [isMobile] = useMediaQuery('(max-width: 480px)');

  const walletFontSize = isMobile ? '2xl' : '3xl';
  const walletSize = isMobile ? 20 : 30;
  const walletWidth = isMobile ? '50vw' : '80vw';

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    setBtnLoading(false);
  }

  const getInput = (num) => {
    setInput((prev) => ({ ...prev, ['amount']: num }));
  }

  const fund = () => {
    setBtnLoading(true);
    setInput((prev) => ({ ...prev, ['amount']: Number(amount) }));

    const updatedInput = { ...input, ['amount']: amount };
    if (Number(toPay) < 1) {
      showAlert("The amount you want to fund myst be greater than 100", "info");
      return;
    }
    const url = 'https://mylesvtu.com.ng/app/store/fund_wallet';
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: updatedInput,
      success: function (res) {
        if (res.status === 1) {
          const amount = res.amount;
          const email = res.email;
          const pk = res.pk;
          const phoneNumber = res.phoneNumber;
          const reference = res.reference;
          const name = res.fullName;
          pay(amount, email, name, phoneNumber, pk, reference);
        } else {
          showAlert("Error Occurred. " + res.msg, "error");
        }
        setBtnLoading(false);
      },
      error: function (a) {
        setBtnLoading(false);
      }
    });
  }

  const pay = (amount, email, name, phoneNumber, pk, reference) => {
    PaystackPop.setup({
      key: pk,
      email: email,
      amount: amount * 100,
      currency: 'NGN',
      ref: reference,
      callback: function (response) {
        const transid = response.reference;
        verify(transid, amount, email);
      },
      onClose: function () {
        console.log('Payment closed');
      }
    }).openIframe();
  }

  const verify = (payment_id, amount, email) => {
    $.ajax({
      url: "https://mylesvtu.com.ng/app/store/verify",
      method: "POST",
      dataType: "json",
      data: {
        verify: 'verify',
        payment_id: payment_id,
        email: email,
        amount: amount
      },
      success: function (res) {
        showAlert(res.msg, "info");
        
        if (res.status === 1) {
          const balance = res.data.balance;
          const transacs = res.data.transactions;
          setData((prev) => ({
            ...prev,
            profile: {
              ...prev.profile,
              ['balance']: balance,
              ['transactions']: transacs,
            }
          }))
        }
      },
      error: function (error) {
        showAlert("We could not process your request. Try again!!!", "error");
      }
    });
  }

  const fundMe = () => {
    setBtnLoading(true);

    if (Object.keys(fundData).length < 1) {
      showAlert("Fill all fields appropriately and try again", "error");
      setBtnLoading(false);
      return;
    }

    $.ajax({
      url: "https://mylesvtu.com.ng/app/store/fundMe",
      method: "POST",
      dataType: "json",
      data: fundData,
      success: function (res) {
        setBtnLoading(false);
        if (res.status === 1) {
          showAlert("Your wallet funding is done,Your account would be updated in less than 3 minutes. Reload the page or click on home after some minutes to see your balance update", "success");
        } else {
          showAlert(res.msg + "  We couldn't process your request. Try again!!!  If problem persist visit our help line", "info");
        }
      },
      error: function () {
        setBtnLoading(false);
        showAlert("Error!!! You cannot reach ther server at the moment. Check your internet connection or try again later!!!", "error");
      }
    });
  }

  const setEmail = (e) => {
    setFundData((prev) => ({ ...prev, ['email']: e.target.value }))
  }

  const setFundAmount = (amount) => {
    setFundData((prev) => ({ ...prev, ['amount']: amount }))

    let fee = 0;
    if (amount < 2500) {
      fee = Math.ceil(0.015 * amount);
    } else {
      fee = Math.ceil(100 + (0.015 * amount));
    }

    const total = Number(fee) + Number(amount);
    setAmount(amount);
    setMerchantFee(fee);
    setToPay(total);
  }

  return (
    <>
      <Head>
        <title> mylesVTU — cheap data,airtime and hire web devey and graphics designer </title>
      </Head>
      <Script src="https://js.paystack.co/v1/inline.js" />
      
      <Box h="100vh" bg={currentMode =="dark" && "black"}>
       {currentMode =="dark"|| currentMode =="light" ?(<Header /> ) : (<></>)}
        
        <ChakraProvider>
  <ToastContainer />        
          {loadingPage ? (
            <Center h="100vh"><Box position="absolute" top="40%" p={4} shadow="sm" bgColor={currentMode === "dark" ? "black" : "white"}><Spinner size="xl" color="#657ce0" /></Box></Center>
          ) : currentMode !== 'light' && currentMode !== 'dark' ? (
              <> </> // Empty view when mode is not known
            ) :  (
            <Flex color={currentMode==="dark" &&"white"} bg={currentMode === "dark" ? "black" :"white"} justify="center" align="center" mb={0} flexDirection="column">
<Wallet />
              <Container mb="0.1em" maxW="lg">
                {fundType === "" && (<Box bg={currentMode === "dark" && "black"} p={3} shadow="" mt={10}><Text>
                  <br /> There is <b>Manual</b> & <b>Automatic</b> funding. <br /> <br />
                  <b>Manual funding</b> is <span style={{ color: "#657ce0" }}>free</span> but may take some time to reflect. <br /><br />
                  <b>Automatic funding</b> attracts a merchant fee but it reflects instantly.</Text>

                </Box>)}
                <Center>
                  <Select _hover={{border:"1px solid #657ce0"}} w="70%" textAlign="center" onChange={(e) => setFundType(e.target.value)} border="1px solid #657ce0" mt="5%">
                    <option value="">Choose Funding Type</option>
                    <option value="auto">Automatic Funding</option>
                    <option value="manual">Manual Funding</option>
                  </Select>
                </Center>
              </Container>             
             
              {fundType === "auto" && (
                <Flex bg={currentMode==="dark" && "black"} color={currentMode === "dark" && "white"} justify="center" align="center" flexDirection="column" mb={2} mt="7em">
                  <Box
                    bg={currentMode==="dark" ? "black" : "white"}

color={currentMode==="dark" && "white"}
                                                  textAlign="center"
                    width={isMobile ? '80vw' : '400px'}
                    height={isMobile ? '47px' : '60px'}
                  >
                    <Input
                      type="number"
                      
                      onChange={(e) => setFundAmount(e.target.value)}
                      placeholder="Enter amount"
                      fontSize="lg"
                      fontWeight="bold"
                      textAlign="center"
                      border="1px solid #657ce0"
                      outline="none"
                      bg="none"
                      color={currentMode === "dark" ? "white" : "black"}
                    />                        
                    
                  
                  </Box>

                  <Center mt={5}>
                    <Text>Merchant Fee : <b>₦{merchantFee}</b></Text> <br />


                  </Center>


                  <Center><Box shadow="md" p={3} mt={4}>Total Due:<Text size="xl" color="#657ce0" fontWeight="bold">₦{toPay}</Text> </Box></Center>

                  <Center mt={6} mb={4}>
                    <Button
                      size="lg"
                      bgColor="#0052D4"
                      color="white"
                      onClick={fund}
                      opacity={1}
                      width={isMobile ? '80vw' : '400px'}
                    >
                      {btnLoading ? (<Spinner size="lg" color="#657ce0" />) : "Fund "}
                    </Button>
                  </Center>
                </Flex>)}
            </Flex> 
          )}

   {fundType === "manual" && (
      
      <Box mt={0}
        maxW="lg"
        mx="auto"
        p={6}
        bg={currentMode === "dark" ? "black" : "white"}
        borderRadius="lg"
        boxShadow="sm"
        color={currentMode ==="dark" ? "white" : "black"}
        textAlign="center"
      >
        <Text fontSize="sm" fontWeight="bold" mb={4}>
        Transfer to <Text color={currentMode ==="dark" ? "#657ce0" : "blue"}>5003199638 - Standard Chartered Bank.</Text> Once debited, Fill and submit the form below.
        </Text>

        <Text color="red.400" mt={4} mb={6}>
    Note!!! Avoid fake transfer notification.
        </Text>

        <VStack spacing={4} align="stretch">
        {/* <InputGroup>
            
            <Input onChange={setEmail} type="email" placeholder="Email address" />
          </InputGroup>

          <InputGroup>*/}
            <InputGroup>
             <Input color="white" onChange={(e)=>setFundAmount(e.target.value)} type="number" placeholder="Amount" />
          </InputGroup>

          <Button mb={4} isLoading={btnLoading} loadingText="Funding..." onClick={fundMe} colorScheme="blue" mt={4}>
            Fund Me
          </Button>
        </VStack>
      
      </Box>)}
          
        </ChakraProvider>
      </Box>


      <NavbarBottom />
      
    </>
  );
}
