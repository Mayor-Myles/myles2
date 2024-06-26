import React, { useState,useEffect } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineFund, AiOutlineUser, AiOutlineWhatsApp,AiOutlineLogout,AiOutlinePoweroff } from 'react-icons/ai';
import Support from '../components/support';
import { useRouter } from 'next/router';
import {useRecoilValue,useSetRecoilState} from "recoil";
import {loginStatus,pageLoading,thisPage,mode} from "./recoil";
import $ from "jquery";


const NavbarBottom = (props) => {
  
  const [showSupport, setShowSupport] = useState(false);
  const [color, setColor] = useState();
  const [idleTime, setIdleTime] = useState(5000);
 // const {switching,setSwitching} = switchData;
  const isLogged = useRecoilValue(loginStatus);

const loadingPage = useRecoilValue(pageLoading);

  const setLoadingPage = useSetRecoilState(pageLoading);

const currentPage = useRecoilValue(thisPage);

  const setCurrentPage = useSetRecoilState(thisPage);
  
  const currentMode = useRecoilValue(mode);
    const setMode = useSetRecoilState(mode);

  useEffect(()=>{


    const userChoice = window.localStorage.getItem("mode");

    if(userChoice === "dark"){
    setMode("dark");
    }
    else{
      setMode("light");
    }

  },[])

  useEffect(()=>{

  setLoadingPage(false);
  },[]);
  
  
  //const switching= props.switching;
//const setSwitching = props.setSwitching;



//const switching = useRecoilValue(switchData);
  //const setSwitching = useSetRecoilState(switchData);
  
 // const isLogged = data.isLogged;
  //alert(isLogged)
  const openSupport = () => {
    setShowSupport(true);
  };

  const router = useRouter();

  const highlights = (num) => {
    setColor(num);
  };

  const goHome = () => {

  if(currentPage != "home"){
    setLoadingPage(true)
    highlights(1);
    router.push('/dashboard');
   // setPage("dashboard");
  }
  };

  const fund = () => {
    if(currentPage != "fundWallet"){
setLoadingPage(true)

    highlights(2);
    router.push('/fundWallet');
   // setPage("fund");
    }
  };

  const login = () => {

    if (currentPage != "login") {
      
    
   setLoadingPage(true)
    //highlights(2);
    router.push('/login');
   // setPage("fund");
    }
  };

  const openProfile = () => {

    if(currentPage != "profile"){
   setLoadingPage(true)
   // highlights(3);
   router.push('/profile');
    //setPage("profile");
    }
  };

    const logout = () => {

      
setLoadingPage(true)
      
      $.ajax({
        url:        'https://mylesvtu.com.ng/app/store/logout',
        
        method: 'POST', 
      dataType:"json",
        
        success:function(response){
          
          if(response.status === 1){
           
          router.push('/login');
          }
        },
        error:function(error){
          
         console.error('Logout error:', error);
        }
      })
    
    };

  return (
    <>
      {showSupport && <Support show={{ showSupport, setShowSupport }} idleTime={{ idleTime, setIdleTime }} />}
      <Flex
        zIndex={9999}
        mt={0}
        bg={currentMode==="dark" ? "black" :"white"}
        color={currentMode ==="dark" && "white"}
        p={5}
        alignItems="center"
        justifyContent="space-around"
        position="fixed"
        bottom={0}
        width="100%"
        boxShadow="0px -4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box onClick={() => { goHome(); highlights(1); }} textAlign="center">
          <Icon as={AiOutlineHome} boxSize={20} color={currentPage === "home" && 'dodgerblue'} />
          <Text fontSize="0.8em" color={currentPage === "home" && 'dodgerblue'}>
            Home
          </Text>
        </Box>
        {/*} <Box onClick={() => { fund(); highlights(2); }} textAlign="center">
          <Icon color={color === 2 && '#657ce0'} as={AiOutlineFund} boxSize={20} />
          <Text fontSize="sm" color={color === 2 && '#657ce0'}>Fund</Text>
        </Box>*/}
        <Box onClick={openProfile} textAlign="center">
          <Icon as={AiOutlineUser} boxSize={20} color={currentPage === "profile" && 'dodgerblue'}/>
            
          <Text color={currentPage === "profile" && 'dodgerblue'}
         fontSize="0.8em">Profile</Text>
        </Box>
        <Box textAlign="center" onClick={openSupport}>
          <Icon as={AiOutlineWhatsApp} boxSize={20} />
          <Text fontSize="0.8em">Support</Text>
        </Box>
      { isLogged ?  (<Box textAlign="center" onClick={logout}>
          <Icon as={AiOutlineLogout} boxSize={20} color="red" />
          <Text fontSize="0.8em">Logout</Text>
        </Box>) : (<Box textAlign="center" onClick={login}>
        <Icon as={AiOutlinePoweroff} boxSize={20} />
        <Text fontSize="0.8em">Login</Text>
      </Box>)}
      </Flex>
    </>
  );
};

export default NavbarBottom;
