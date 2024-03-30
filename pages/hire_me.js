import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Textarea,
  Select,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  FormControl,
  ChakraProvider,
  Container,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';
import NavbarBottom from '../components/navbarBottom';
import Header from '../components/header';
import Adverts from '../components/adverts';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mode, thisPage, pageLoading } from "../components/recoil";

const Hire = () => {

  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);

  const router = useRouter();
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);

  useEffect(() => {
    setCurrentPage("hire");
    const userChoice = window.localStorage.getItem("mode");

    if (userChoice === "dark") {
      setMode("dark");
    }
    else {
      setMode("light");
    }

  }, []);

  useEffect(() => {
    setCurrentPage("hire");
    setLoadingPage(false);

  }, []);

  const [input, setInput] = useState({
    phoneNumber: '',
    service: '',
    description: '',
    referralCode: '', // New state for referral code
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const getInput = (name, value) => {
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
    });
    setBtnLoading(false);
  };

  const hireUs = () => {
    if (!input.phoneNumber || !input.service || !input.description) {
      showAlert('Please fill all fields appropriately!!!', 'info');
      return;
    }

    setBtnLoading(true);
    const url = 'https://mylesvtu.com.ng/app/store/hire';

    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        setBtnLoading(false);
        if (r.status === 1) {
          showAlert('Your request has been processed!! Our agent will get in touch with you very shortly. Please make your phone number available', 'success');
        } else {
          showAlert(r.msg, 'info');
        }
        setBtnLoading(false);
      },
      error: function () {
        showAlert('Your request cannot be processed. Please try again.', 'info');
        setBtnLoading(false);
      },
    });
  };

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  if (currentMode !== "light" && currentMode !== "dark") {
    return (<></>);
  }

  return (
    <>
      <Head>
        {/* Meta tags */}
      </Head>
      <Header />
      <Container h="100vh" bg={currentMode === "dark" && "black"} color={currentMode == "dark" && "white"}>

        {loadingPage ? (<ChakraProvider> <Center h="100vh"><Box position="absolute" top="40%" p={4} shadow="sm" bgColor={currentMode === "dark" ? "black" : "white"}><Spinner size="xl" color="#657ce0" /></Box></Center></ChakraProvider>) : (
          <ChakraProvider>
            <Box p={4} maxWidth="500px" mx="auto">
              <Heading align="center" my={10} as="h2" size="lg" mb={4}>
                Hire Us
              </Heading>

              <VStack spacing={4} align="stretch">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaPhone} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={(e) => getInput(e.target.name, e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <Select
                      name="service"
                      placeholder="Select Service"
                      onChange={(e) => getInput(e.target.name, e.target.value)}
                    >
                      <option value="Web developer">Web Developer</option>
                      <option value="Graphics Design">Graphics Design</option>
                    </Select>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <Textarea
                      h="11em"
                      name="description"
                      placeholder="Explain what you want in detail..."
                      onChange={(e) => getInput(e.target.name, e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                {/* New input field for referral code */}
                <FormControl>
                  <InputGroup>
                    <Input
                      type="text"
                      name="referralCode"
                      placeholder="Referral Code (Optional)"
                      onChange={(e) => getInput(e.target.name, e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={btnLoading}
                  onClick={hireUs}
                >
                  Save Changes
                </Button>
              </VStack>
            </Box>
          </ChakraProvider>)}
      </Container>

      <NavbarBottom />
      <ToastContainer />
    </>
  );
};

export default Hire;
