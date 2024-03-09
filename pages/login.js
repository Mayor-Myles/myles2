import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  ChakraProvider,
  Spinner
} from '@chakra-ui/react';
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { csrfToken, loginStatus, userData, thisPage, pageLoading, mode } from '../components/recoil';
import Head from "next/head";
import Header from "../components/header";

export default function Login() {
  const [input, setInput] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [csrf, setCsrf] = useRecoilState(csrfToken);
  const [isLogged, setLogged] = useRecoilState(loginStatus);
  const [data, setData] = useRecoilState(userData);
  const router = useRouter();
  const loadingPage = useRecoilValue(pageLoading);
  const setLoadingPage = useSetRecoilState(pageLoading);
  const currentPage = useRecoilValue(thisPage);
  const setCurrentPage = useSetRecoilState(thisPage);
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);

  useEffect(() => {
    const userChoice = window.localStorage.getItem("mode");
    if (userChoice === "null") {
      return;
    }
    if (userChoice === "dark") {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, []);

  useEffect(() => {
    setCurrentPage("login");
    setLoadingPage(false);
  }, []);

  useEffect(() => {
    const url = 'https://mylesvtu.com.ng/app/store/welcome';
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      success: function (r) {
        setBtnLoading(false);
        setLogged(r.data.isLogged);
        setCsrf(r.token);
      },
      error: function () {
        setBtnLoading(false);
      },
    });
  }, [setLogged, setCsrf]);

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
    setBtnLoading(false);
  };

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const processLogin = () => {
    setBtnLoading(true);

    if (Object.keys(input).length < 2) {
      showAlert('Fill all required details.', 'warning');
      setBtnLoading(false);
      return;
    }

    const url = 'https://mylesvtu.com.ng/app/store/login';
    $.ajax({
      url: url,
      method: 'post',
      data: { login: 'login', ...input },
      dataType: 'json',
      success: function (r) {
        if (r.status === 1) {
          setLogged(true);
          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle });
          router.push({ pathname: '/dashboard' });
        } else {
          showAlert(r.msg, 'warning');
        }
        setBtnLoading(false);
        setCsrf(r.token);
      },
      error: function () {
        showAlert('Something went wrong. Please try again!!!', 'warning');
        setBtnLoading(false);
      },
    });
  };

  const openReg = () => {
    setLoadingPage(true);
    router.push("/register");
  }

  const openReset = () => {
    setLoadingPage(true);
    router.push("/reset");
  }

  currentMode !=="light" && currentMode !== "dark" && (<></>)

  return (
    <>
      <Head>
        {/* Meta tags */}
      </Head>
      <ChakraProvider>
        <ToastContainer />
        {loadingPage ? (
          <Center bg={currentMode =="dark" && "black"} h="100vh">
            <Box position="absolute" top="40%" borderRadius={5} shadow="md" p={1}>
              <Spinner size="xl" color="#657ce0" />
            </Box>
          </Center>
        ) : currentMode !== 'light' && currentMode !== 'dark' ? (
          <></> // Empty view when mode is not known
        ) : (
          <Box bg={currentMode === "dark" && "black"} h="100vh">
            <Header />
            <Center bgColor={currentMode === "dark" && "black"}>
              {/* Login form */}
              <Box
                color={currentMode === "dark" && "white"}
                textAlign="center"
              >
                <Text fontWeight="bold" size="xl" my={10}>Welcome</Text>
                <InputGroup my={6}>
                  <Input border="1px solid #657ce0" h="3em"
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={getInput}
                    value={input.phoneNumber || ""}
                    required
                  />
                  <InputRightElement>
                    <FiUser />
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Input h="3em" border="1px solid #647ce0"
                    type={input.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={getInput}
                    value={input.password || ""}
                    required
                  />
                  <InputRightElement width="3rem">
                    <Text justify="center" align="center"
                      size="lg"
                      onClick={() =>
                        setInput((prevInput) => ({
                          ...prevInput,
                          showPassword: !prevInput.showPassword,
                        }))
                      }
                    >
                      {input.showPassword ? <FiEyeOff /> : <FiEye size="1em" />}
                    </Text>
                  </InputRightElement>
                </InputGroup>
                <Text onClick={openReset} mt={5} color="#657ce0" textAlign="right" fontSize="sm">
                  Forgot Password
                </Text>
                <Button mt="4em"
                  colorScheme="blue"
                  size="md"
                  isLoading={btnLoading}
                  loadingText="Logging in"
                  onClick={processLogin}
                  w="50%"
                  mx="auto"
                >
                  Login
                </Button>
                <Text mt={10}>
                  Don't have an account?{" "}
                  <Text mb={10} cursor="pointer" onClick={openReg} as="span" color="blue.500">
                    Sign Up
                  </Text>
                </Text>
              </Box>
            </Center>
          </Box>
        )}
      </ChakraProvider>
    </>
  );
}
