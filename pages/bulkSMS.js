import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  ChakraProvider,
  Center,
  Spinner,
  useColorMode,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarBottom from "../components/navbarBottom";
import Header from '../components/header';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageLoading, thisPage, mode } from "../components/recoil";
import $ from 'jquery';

const SendBulkSMS = () => {
  const [cost, setCost] = useState(0);
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);
  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);

  useEffect(() => {
    const userChoice = window.localStorage.getItem("mode");
    setMode(userChoice === "dark" ? "dark" : "light");
    setCurrentPage("bulkSMS");
    setLoadingPage(false);
  }, []);

  useEffect(() => {
    const arr = numbers.trim().split(",");
    const totalRecipients = arr.length;
    const charsPerPage = 150;
    const msgChars = message.length;
    const costPerPage = 3;
    let pages = Math.floor(msgChars / charsPerPage);
    if (pages < 1) {
      pages = 1;
    }
    const totalCost = totalRecipients * costPerPage * pages;
    setCost(totalCost);
  }, [numbers, message]);

  const handleSend = () => {
    if (!sender || !numbers || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    $.ajax({
      url: 'https://mylesvtu.com.ng/app/store/sendBulkSMS',
      type: 'POST',
      dataType: 'json',
      data: {
        numbers: numbers,
        message: message,
        sender: sender
      },
      crossDomain: true,
      success: function(data) {
        data.msg === "success" &&  toast.info("Message has been sent to all recipients.");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', errorThrown);
        toast.error("Error sending bulk SMS!");
      },
      complete: function() {
        setLoading(false);
      }
    });
  };

  if (currentMode == null) {
    return null;
  }

  return (
    <>
      <Header />
      <ChakraProvider>
        {loadingPage ? (
          <Center bg={currentMode === "dark" && "black"} mt="" height="100vh">
            <Box
              position="absolute"
              top="40%"
              bg={currentMode === "dark" && "black"}
              p={4}
              maxW="md"
              borderWidth=",0px"
              borderColor="#657ce0"
              borderRadius="md"
              boxShadow="sm"
              textAlign="center"
            >
              <Spinner color="#657ce0" size="lg" />
            </Box>
          </Center>) : (
                <Container maxW="100vw" h="100vh" bg={currentMode === "dark" && "black"}
              color={currentMode === "dark" && "white"}
            >
            <Box
              h="80vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              m={0}
              p={0}
            >
              <VStack mx={5} spacing={4} align="stretch">
                <Text fontWeight="bold" size="md" mb={2} color={currentMode === "dark" ? "white" : "black"} textAlign="center">
                  Send Bulk SMS
                </Text>
                <Box>
                  <FormControl>
                    <FormLabel fontSize="lg" color={currentMode === "dark" ? "white" : "black"}>Sender Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" children={<FaUser color="#657ce0" />} />
                      <Input type="text" placeholder="Sender Name" onChange={(e) => setSender(e.target.value)} />
                    </InputGroup>
                  </FormControl>
                </Box>
                <Box>
                  <Text mt={3} mb={2} color="dodgerblue" fontSize="md" textAlign="left">Enter phone numbers and separate them with commas.</Text>
                  <Textarea onChange={(e) => setNumbers(e.target.value)} placeholder="08147823198,07033445578,09163526373" />
                </Box>
                <Box>
                  <Textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your message...." />
                </Box>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color={currentMode === "dark" ? "white" : "black"} textAlign="center">Amount to be Charged: ₦{cost}</Text>
                </Box>
                <Box>
                  <Button colorScheme="blue" size="lg" width="100%" onClick={handleSend} isLoading={loading}>
                    {loading ? "Sending..." : "Send"}
                  </Button>
                </Box>
              </VStack>
            </Box>
  </Container>
          )}
      </ChakraProvider>
      <NavbarBottom />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default SendBulkSMS;
