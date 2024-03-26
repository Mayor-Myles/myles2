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
  Spinner
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import NavbarBottom from "../components/navbarBottom";
import Header from '../components/header';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageLoading, thisPage, mode } from "../components/recoil";
import $ from 'jquery'; // Import jQuery

const SendBulkSMS = () => {
  const [cost, setCost] = useState(0);
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(""); // State for sender name
  const [loading, setLoading] = useState(false); // Loading state for the button
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);
  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);

  useEffect(() => {
    const userChoice = window.localStorage.getItem("mode");

    if (userChoice === "dark") {
      setMode("dark");
    } else {
      setMode("light");
    }

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

  }, [numbers, setNumbers]);

  const handleSend = () => {
    // Check if all input fields are filled
    if (!sender || !numbers || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Set loading state to true
    setLoading(true);

    // jQuery AJAX POST request
    $.ajax({
      url: 'https://mylesvtu.com.ng/app/store/sendBulkSMS',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        numbers: numbers,
        message: message,
        sender: sender // Using sender state here
      }),
      crossDomain: true,
      success: function(data) {
        // Handle success response
        console.log(data);
        // Show toast notification with response message
        toast.info(data.msg);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors
        console.error('Error:', errorThrown);
        // Show toast notification for error
        toast.error("Error sending bulk SMS!");
      },
      complete: function() {
        // Set loading state back to false
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
              boxShadow="lg"
              textAlign="center"

            >
              <Spinner color="#657ce0" size="lg" />
              <p></p>
            </Box>
          </Center>) : (

            <Container bg={currentMode === "dark" && "black"} color={currentMode == "dark" && "white"} maxW="xl" centerContent p={4}>
              <Box m="auto" textAlign="center" mt="4em">
                <Heading as="h1" mb={6}>
                  Send Bulk SMS
                </Heading>
              </Box>

              <Box width={{ base: '100%', md: '50%' }} mx="auto">
                <InputGroup mb={4}>
                  <InputLeftElement pointerEvents="none" children={<FaUser color="#657ce0" />} />
                  <Input type="text" placeholder="Sender Name" onChange={(e) => setSender(e.target.value)} />
                </InputGroup>
                <Box mt={5}>
                  <Text my={3} color="red" fontSize="md"> Enter phone numbers and separate it with comma. </Text>

                </Box>
                <Textarea onChange={(e) => setNumbers(e.target.value)} mb={4} placeholder="08147823198,07033445578,09163526373" />

                <Textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your message...." />

                <Box mb={4} textAlign="center">

                  <Box mt={2} fontWeight="bold">
                    Amount to be Charged: ₦{cost}
                  </Box>
                </Box>

                <Button colorScheme="blue" size="lg" width="100%" onClick={handleSend} isLoading={loading}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </Box>
            </Container>)}

      </ChakraProvider>
      <NavbarBottom />
      <ToastContainer /> {/* ToastContainer to display toast notifications */}
    </>
  );
};

export default SendBulkSMS;
