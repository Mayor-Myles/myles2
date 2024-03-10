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
