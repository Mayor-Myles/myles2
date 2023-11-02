import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Container,
  Box,
  VStack,
  Input,
  Button,
  Heading,
  Text,
  InputLeftElement,
  InputGroup, // Add InputGroup
  Icon,Center
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import Header from '../components/header';
import Adverts from '../components/adverts';
import NavbarBottom from '../components/navbarBottom';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import $ from "jquery";

import {useRecoilValue,useSetRecoilState,} from "recoil";
import {loginStatus,csrfToken,userData} from "../components/recoil";
import Script from "next/script";




export default function Profile() {

  const showAlert = (message,type)=>{

  toast[type](`📑 ${message}`, {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });

    setBtnLoading(false)

     }

  const [input,setInput] = useState({"email":"","fullName":"","password":"","newPassword":"","phoneNumber":""});

  const  logged = useRecoilValue(loginStatus);

const setLogged = useSetRecoilState(loginStatus);
  
  const  csrf = useRecoilValue(csrfToken);
         
  const  setCsrf  = useSetRecoilState(csrfToken);

  const data = useRecoilValue(userData);
         
    const setData = useSetRecoilState(userData);

const[btnLoading,setBtnLoading] = useState(false);

  const profile = data.profile;
  //const bundle = data.dataBundle;
  const router = useRouter();

  useEffect(() => {
    if(!profile){
    const url = 'https://mtstorez.000webhostapp.com/app/store/welcome';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      crossDomain: true,
      success: function (r, status, xhr) {
        if (r.data.isLogged) {
          setLogged(r.data.isLogged);
          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle });
        }
      },
      error: function () {
        showAlert("Server is down", "warning");
      },
    });
    }
  },[profile]);

  
if (!data || !profile) {


    
    return (
      
      <Center display="flex" justifyContent="center" alignItems="center" h="100vh">
        
        <FallingLines color="#657ce0" width="50" visible={true} ariaLabel="falling-lines-loading" />
      </Center>
    );
  }

  const getInput = (e) => {

  const name = e.target.name;

  const value = e.target.value;

  setInput({...input,[name]:value})

//setInput(updatedData)

}

  const notify = () => {

        showAlert("Your profile has been updated..","info");

      }


//Process Reset

  const update = () => {
    //console.log(1)
const updatedInput = {...input,['csrf']:csrf};

//setInput(updatedInput);
  setBtnLoading(true);

//ensure empty fields is not sent
if((Object.keys(input).length) < 1){

  showAlert("Please Fill a field to update!!!","warning");

}

     const url =" https://mtstorez.000webhostapp.com/app/store/edit_profile";  

       $.ajax({

      url:url,
      method:'post',
      dataType:'json',
      data:updatedInput,
      success: function(r){

 if( r.status === 1 ){

   //props.setIsLogged(true)
//setOpenReset(false);
notify();
  // setPage({goto:'login',func:alert})
//setToRender("/login")
//console.log("status is 1");
 }

else{

  showAlert(r.msg,"error")
}
        setBtnLoading(false);


  setCsrf(r.token);


      },
      error:function(a){
//console.log(a)
        setBtnLoading(false)

      }

    })//ajax end


  }



  return (
    <>
      <Script>
        
      <script src="//cdn.jsdelivr.net/npm/eruda"></script>

      <script>eruda.init()</script>  

      </Script>
      <Header />
      <ChakraProvider>
        <Heading m={5} size="md" justify="center" align="center">
          My Profile
        </Heading>

        <Container maxW="md" p={4}>
          <Box zIndex={-1} borderWidth="1px" borderRadius="lg" p={6}>
            <VStack spacing={4} align="stretch">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaUser} color="gray.400" />
                </InputLeftElement>
                <Input name="fullName" onChange={getInput} type="text" placeholder={profile.fullName || "Enter your Fullname"} />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="gray.400" />
                </InputLeftElement>
                <Input name="email" onChange={getInput} type="email" placeholder={profile.email || "Email"} />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input name="password" onChange={getInput} type="password" placeholder="Password" />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input name="newPassword" onChange={getInput} type="password" placeholder="New Password" />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaPhone} color="gray.400" />
                </InputLeftElement>
                <Input name="phoneNumber" onChange={getInput} type="tel" placeholder={profile.phoneNumber || "Phone Number"} />
              </InputGroup>

              <Button onClick={update} colorScheme="blue" type="submit">
                {  btnLoading ?  <FallingLines color="white" width="50" visible={true} ariaLabel="falling-lines-loading" />   : "Update" }
              </Button>
            </VStack>
          </Box>
        </Container>
      </ChakraProvider>
      <Adverts />
      <NavbarBottom />
      <ToastContainer/>
    </>
  );
}
