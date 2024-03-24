import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, ChakraProvider, IconButton ,Center} from '@chakra-ui/react';
import { FiCreditCard, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userData, loginStatus } from '../components/recoil';
import $ from "jquery";

export default function Wallet() {
  const data = useRecoilValue(userData);
  const setLogged = useSetRecoilState(loginStatus);
  const setData = useSetRecoilState(userData);
  const profile = data.profile;

  const [showBalance, setShowBalance] = useState(true);

  
useEffect(()=>{

//set the preffered choice of user on balance show or hide
const balanceStatus = localStorage.getItem("showBalance");
    alert("Storage balance is  "+balanceStatus);

  if(balanceStatus !== null){
  setShowBalance(balanceStatus);
    }
alert("new show balance is " + showBalance);

},[showBalance,setShowBalance]);


  useEffect(() => {

    if (!profile) {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        //crossDomain: true,
        success: function (r, status, xhr) {
          if (r.data.isLogged) {
            setLogged(r.data.isLogged);
            const profile = r.data.profile;
            const dataBundle = r.data.dataBundle;
            setData({ profile: profile, dataBundle: dataBundle });
          }
        },
        error: function () {
          console.log("Server is down");
        },
      });
    }
  }, [profile]);

  const toggleBalance = () => {
    alert("Show status orig is "+showBalance);
    localStorage.setItem("showBalance",!showBalance);
    setShowBalance(!showBalance);
  }



  const gradientBackground = 'linear(to-r, #0052D4, #4364F7)'; // Replace with your desired gradient colors

  return (
    <ChakraProvider>
      <Flex justify="center" align="center" width="100%" mt={10}>
        <Box
          width={{ base: '80%', sm: '60%', md: '40%' }}
          borderRadius="xl"
          boxShadow="lg"
          p={3}
          bgGradient={gradientBackground}
          color="white"
          textAlign="center"
          maxH="6.6em"
          overflow="hidden"
          position="relative"
        >
          <Flex direction="column" justify="center" align="center">
            {showBalance ? (<FiEyeOff onClick={toggleBalance} size={15} color="white" />) :(<FiEye onClick={toggleBalance} size={15} color="white" />)}
            <Text fontSize="sm" fontWeight="bold" mt={2}>
            Hi, {profile && (profile.fullName).substring(0,15)}
            </Text>
            <Text fontSize="xs" fontWeight="" color="white" mt={1}>
              Phone: +234{profile && profile.phoneNumber}
            </Text>
            
              <Text m={6} fontSize="md" fontWeight="bold"  color="white" mt={1}>
            {showBalance ? ( <Center> ₦{profile && profile.balance.toLocaleString()} </Center>) : (<Center> ***** </Center> )}
              </Text> 
            
        
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
