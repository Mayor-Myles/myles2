import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Input,
  Button,
  Heading,
  Text,
  ChakraProvider,
  Image,
  Spinner,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { csrfToken,thisPage,pageLoading,mode } from '../components/recoil';
//import Link from 'next/link';
import Header from "../components/header";
import {FiMail} from "react-icons/fi";



 function Reset() {
  const [email, setEmail] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const csrf = useRecoilValue(csrfToken);
  const setCsrf = useSetRecoilState(csrfToken);
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);

    const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);
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

  useEffect(()=>{
    setLoadingPage(false);
  setCurrentPage("reset");
  },[]);
  
  useEffect(() => {
    if (csrf === '') {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
       // crossDomain: true,
        success: function (r) {
          setCsrf(r.token);
        },
        error: function () {
          //showAlert('Server is down', 'warning');
          setBtnLoading(false);
        },
      });
    }
  }, [csrf, setCsrf]);

  const showAlert = (message, type) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
      //toastId:"reset",
    });
    setBtnLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProceedClick = () => {
    setBtnLoading(true);

    if (!email) {
      showAlert('Please enter your registered email.', 'warning');
      setBtnLoading(false);
      return;
    }

    const input = {
      csrf: csrf,
      email: email,
    };

      const url = 'https://mylesvtu.com.ng/app/store/reset_password';

    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: input,
      success: function (r) {
        if (r.status === 1) {
          showAlert(
            'Your password has been reset. Open your email and follow the instructions.',
            'success'
          );
          setCsrf(r.data.token);
        } else {
          showAlert('Your request was not successful. Ensure that you have entered the right email', 'error');
          setCsrf(r.data.token);
        }
        setBtnLoading(false);
      },
      error: function (a) {
        setBtnLoading(false);
      },
    });
  };


const openLogin = () => {

  setLoadingPage(true);
  router.push("/login");

};

currentMode !=="light" && currentMode !== "dark" && (<></>)

  return (
    <ChakraProvider>
      <ToastContainer />
      {loadingPage ? (
        <Center h="100vh" bg={currentMode === "dark" && "black"}>
          <Box position="absolute" top="40%" borderRadius={5} shadow="md" p={1}>
            <Spinner size="xl" color="#657ce0" />
          </Box>
        </Center>
      ) : (
        <Box bg={currentMode === "dark" && "black"} h="100vh">
          <Header />
          <Center bgColor={currentMode === "dark" && "black"}>
            <Box
              color={currentMode === "dark" && "white"}
              textAlign="center"
              p={8}
              rounded="lg"
              boxShadow={0}
              maxW="400px"
              w="100%"
            >
              <Heading as="h3" size="xl" my={10}>
                Forgot Password
              </Heading>
              <InputGroup my={6}>
                <Input
                  border="1px solid #657ce0"
                  h="3em"
                  type="email"
                  name="email"
                  placeholder="Your Registered Email"
                  onChange={handleEmailChange}
                  value={email}
                  required
                />
                <InputRightElement>
                  <FiMail />
                </InputRightElement>
              </InputGroup>
              <Button
                mt={4}
                colorScheme="blue"
                size="md"
                isLoading={btnLoading}
                loadingText="Proceeding"
                onClick={handleProceedClick}
                w="50%"
                mx="auto"
              >
                Proceed
              </Button>
              <Text mt={4}>
                Remember your password?{' '}
                <Text onClick={openLogin} as="span" color="blue.500" cursor="pointer">
                  Login
                </Text>
              </Text>
            </Box>
          </Center>
        </Box>
      )}
    </ChakraProvider>

  );
}

export default Reset;
