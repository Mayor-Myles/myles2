import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  Checkbox,
  Stack,
  Image,
  ChakraProvider,
  Spinner
} from '@chakra-ui/react';
import { FiEye, FiEyeOff,FiUser,FiMail,FiSmartphone } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import $ from 'jquery';
import Head from "next/head";
import Header from "../components/header";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { csrfToken,pageLoading,thisPage,mode } from '../components/recoil';

export default function Register() {
  const [input, setInput] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const csrf = useRecoilValue(csrfToken);
  const setCsrf = useSetRecoilState(csrfToken);
  //const thisPage = useRecoilValue(page);
  //const setPage = useSetRecoilState(page);
const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);

useEffect(() => {
  
  const userChoice = window.localStorage.getItem("mode");

  if(userChoice === "dark"){
  setMode("dark");
  }
  else{
    setMode("light");
  }

},[]);
  
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);

    const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);

  useEffect(()=>{
  setCurrentPage("register");
  setLoadingPage(false);
  },[]);
  
  
  useEffect(() => {
    
    if (csrf === '') {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        //crossDomain: true,
        success: function (r) {
          setCsrf(r.token);
        },
        error: function () {
         // showAlert('Server is down', 'warning');
          setBtnLoading(false);
        },
      });
    }
  }, [csrf, setCsrf]);
//alert (thisPage)
  const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
      //toastId:"register",
    });

    setBtnLoading(false);
  };

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const processRegister = () => {
    setBtnLoading(true);

    if (Object.keys(input).length < 4) {
      showAlert('Fill all required details.', 'warning');
      setBtnLoading(false);
      return;
    }

      const url = 'https://mylesvtu.com.ng/app/store/register';

    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        if (r.status === 1) {
          showAlert(
            'Your account setup is complete. Please go to login to use our services.',
            'success'
          );
        } else {
          showAlert(r.msg, 'warning');
        }
        setBtnLoading(false);
        setCsrf(r.token);
      },
      error: function () {
        setBtnLoading(false);
      },
    });
  };

  const openLogin = () => {
   // showAlert('We are now taking you to the login page', 'info')
   setLoadingPage(true);
   router.push("/login");

  };

  
currentMode !=="light" && currentMode !== "dark" && (<></>)

  
  return (
     <>
     <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Register - MylesVTU</title>
  <meta name="description" content="Create a new account on MylesVTU. Sign up for access to affordable digital services including cheap data, airtime top-up, fund wallet, and more." />
  <meta name="keywords" content="register, sign up, MylesVTU registration, cheap data, airtime top-up, fund wallet, digital services" />
  <meta name="author" content="MylesVTU" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="generator" content="Your CMS or Development Platform" />

  {/* Open Graph meta tags for social sharing */}
  <meta property="og:title" content="Register - MylesVTU" />
  <meta property="og:description" content="Create a new account on MylesVTU. Sign up for access to affordable digital services including cheap data, airtime top-up, fund wallet, and more." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mylesvtu.com.ng/register" />
  <meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />

  {/* Twitter Card meta tags for Twitter sharing */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Register - MylesVTU" />
  <meta name="twitter:description" content="Create a new account on MylesVTU. Sign up for access to affordable digital services including cheap data, airtime top-up, fund wallet, and more." />
  <meta name="twitter:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />
</Head>
         
       <ChakraProvider>
         <ToastContainer />
         {loadingPage ? (
           <Center bg={currentMode==="dark" && "black"} h="100vh" >
<Box shadow="md" p={3}>
               <Spinner size="xl" color="#657ce0" />
             </Box>
           </Center>
         ) : currentMode !== "dark" && currentMode !=="light" ? (<></>) : (
           <Center bg={currentMode==="dark" && "black"} h={{ md: '100vh' }}>
             <Box bg={currentMode === "dark" && "black"} h="100vh">
               <Header />
               <Center bgColor={currentMode === "dark" && "black"}>
                 <Box
                   color={currentMode === "dark" && "white"}
                   textAlign="center"
                   p={6}
                   rounded="lg"
                   boxShadow={0}
                   maxW="400px"
                   w="100%"
                 >
                   <Heading as="h3" size="md" mb={2}>
                     Register
                   </Heading>
                   <InputGroup my={6}>
                     <Input
                       border="1px solid #657ce0"
                       h="3em"
                       type="number"
                       name="phoneNumber"
                       placeholder="Phone Number"
                       onChange={getInput}
                       value={input.phoneNumber || ""}
                       required
                     />
                     <InputRightElement>
                       <FiSmartphone />
                     </InputRightElement>
                   </InputGroup>
                   <InputGroup my={6}>
                     <Input
                       border="1px solid #657ce0"
                       h="3em"
                       type="email"
                       name="email"
                       placeholder="Email"
                       onChange={getInput}
                       value={input.email || ""}
                       required
                     />
                     <InputRightElement>
                       <FiMail />
                     </InputRightElement>
                   </InputGroup>
                   <InputGroup my={6}>
                     <Input
                       border="1px solid #657ce0"
                       h="3em"
                       type={input.showPassword ? "text" : "password"}
                       name="password"
                       placeholder="Password"
                       onChange={getInput}
                       value={input.password || ""}
                       required
                     />
                     <InputRightElement>
                       <Text
                         size="sm"
                         onClick={() =>
                           setInput((prevInput) => ({
                             ...prevInput,
                             showPassword: !prevInput.showPassword,
                           }))
                         }
                       >
                         {input.showPassword ? <FiEyeOff /> : <FiEye />}
                       </Text> 
                     </InputRightElement>
                   </InputGroup>
                   <InputGroup my={6}>
                     <Input
                       border="1px solid #657ce0"
                       h="3em"
                       type="text"
                       name="fullName"
                       placeholder="Full Name"
                       onChange={getInput}
                       value={input.fullName || ""}
                       required
                     />
                     <InputRightElement>
                       <FiUser />
                     </InputRightElement>
                   </InputGroup>
                   
                   <Button
                     colorScheme="blue"
                     size="md"
                     isLoading={btnLoading}
                     loadingText="Registering"
                     onClick={processRegister}
                     mt={2}
                     w="100%"
                   >
                     Register
                   </Button>
                   <Text mt={4}>
                     Already have an account?{' '}
                     <Text onClick={openLogin} as="span" color="blue.500" cursor="pointer">
                       Log In
                     </Text>
                   </Text>
                   {btnLoading && <ToastContainer />}
                 </Box>
               </Center>
             </Box>
           </Center>
         )}
       </ChakraProvider>

     </>
    
  );
}
