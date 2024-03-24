import React from 'react';
import { FaUser, FaMobile, FaMoneyBillAlt } from 'react-icons/fa';
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
Flex,
  Text,Center,Spinner
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarBottom from "../components/navbarBottom";
import Header from '../components/header';
import $ from 'jquery';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageLoading,thisPage,mode } from "../components/recoil";

const SendBulkSMS = () => {
  
const[cost,setCost] =  useState(0);

  const[numbers,setNumbers] = useState("");

  const[message,setMessage] = useState("");
const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
  const [spin, setSpin] = useState(true);
  const [selected, setSelected] = useState(null);
  const [network, setNetwork] = useState('mtn');
const loadingPage = useRecoilValue(pageLoading);
const setLoadingPage = useSetRecoilState(pageLoading);
  const currentPage = useRecoilValue(thisPage);
const setCurrentPage = useSetRecoilState(thisPage);



  
  
useEffect(() => {
  
  const userChoice = window.localStorage.getItem("mode");

  if(userChoice === "dark"){
  setMode("dark");
  }
  else{
    setMode("light");
  }

  setCurrentPage("bulkSMS");
  setLoadingPage(false);

},[]);

  useEffect(()  => {

//const n = numbers.trim().length;total phone numbers for messages to be sent to

    const arr = numbers.trim().split(",");//getting the total phone numbers we want to send message to.

    
    setCost(arr.len*3);
    
  },[numbers,setNumbers]);

if(currentMode == null){

return null;
}
  
  return (
    <>
      <Header/>
   <ChakraProvider>
     {loadingPage ?(
<Center bg={currentMode ==="dark" && "black"} mt="" height="100vh">
            <Box
              position="absolute"
              top="40%"
             bg={currentMode==="dark" && "black"}
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
          </Center>):(


    <Container bg={currentMode==="dark" && "black"} color={currentMode=="dark" && "white"}  maxW="xl" centerContent p={4}>
      <Box m="auto" textAlign="center" mt="4em">
        <Heading as="h1" mb={6}>
          Send Bulk SMS
        </Heading>
      </Box>

      <Box width={{ base: '100%', md: '50%' }} mx="auto">
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none" children={<FaUser color="#657ce0" />} />
          <Input type="text" placeholder="Sender Name" />
        </InputGroup>
<Box mt={5}>
  <Text my={3} color="red" size="md"> Enter phone numbers and separate it with comma. </Text> 
  
</Box>
        <Textarea onChange={(e)=>setNumbers(e.target.value)} mb={4} placeholder="08147823198,07033445578,09163526373" />

        <Textarea onChange={(e)=> setMessage(e.target.value)} placeholder="Type your message...." />

        <Box mb={4} textAlign="center">
          
          <Box mt={2} fontWeight="bold">
            Amount to be Charged: ₦{cost}
          </Box>
        </Box>

        <Button colorScheme="blue" size="lg" width="100%">
          Send
        </Button>
      </Box>
    </Container>)}
  
    </ChakraProvider>
      <NavbarBottom/>
    </>
      );
    

};

export default SendBulkSMS;
