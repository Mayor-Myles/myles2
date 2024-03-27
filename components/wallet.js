import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, ChakraProvider, IconButton, Center } from '@chakra-ui/react';
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

  useEffect(() => {
    // Retrieve showBalance value from local storage and convert it to boolean
    const balanceStatus = localStorage.getItem("showBalance");
    if (balanceStatus !== null) {
      setShowBalance(JSON.parse(balanceStatus));
    }
  }, []);

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
    const newShowBalance = !showBalance;
    setShowBalance(newShowBalance);
    // Store the updated showBalance value in local storage
    localStorage.setItem("showBalance", JSON.stringify(newShowBalance));
  }

  const gradientBackground = 'linear(to-r, #0052D4, #4364F7)'; // Replace with your desired gradient colors

  return (
    <ChakraProvider>
      <Flex justify="center" align="center" width="100%" mt={2}>
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
          {showBalance ? (
            <FiEyeOff onClick={toggleBalance} size={17} m={4} color="white" style={{ position: "absolute", top: 4, right: 4 }} />
          ) : (
            <FiEye onClick={toggleBalance} size={17} m={4} color="white" style={{ position: "absolute", top: 4, right: 4 }} />
          )}
          <Flex direction="column" justify="center" align="center">
            <Text fontSize="sm" fontWeight="bold" mt={2}>
              Hi, {profile && (profile.fullName).substring(0, 15)}
            </Text>
            <Text fontSize="xs" fontWeight="" color="white" mt={1}>
              Phone: +234{profile && profile.phoneNumber}
            </Text>
            <Text position="absolute" top={4} left={4} fontSize="md" fontWeight="bold" color="white">
              {showBalance ? (`₦${profile && profile.balance.toLocaleString()}`) : '*****'}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
