import { Box, Text, Image } from '@chakra-ui/react';
import { FiMoon,FiSun} from 'react-icons/fi'; // Using Feather Icons for Moon
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import {mode} from "../components/recoil";
import {useRecoilValue,useSetRecoilState} from "recoil";


  
const Header = () => {
  
  const [isFixed, setIsFixed] = useState(false);
  
  const currentMode = useRecoilValue(mode);

  const setMode = useSetRecoilState(mode);

const changeMode = ()=>{

  const userChoice = localStorage.getItem("mode");
  //state not set before but user has picked choice
  alert(userChoice);
 if(userChoice =="light"){
setMode("dark");//set new mode to dark
  window.localStorage.setItem("mode","dark");
 
  }
else if(userChoice =="dark"){
  setMode("light");//sets new mode to light 
  window.localStorage.setItem("mode","light");
}
  else{
setMode("light");//user doesn't have a preference yet
window.localStorage.setItem("mode","light");
  }


}//method to change mode

  useEffect(()=>{  
    //alert(currentMode);
   currentMode === "light" ? localStorage.setItem("mode","light") : localStorage.setItem("mode","dark");
  },[currentMode,setMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital@1&display=swap" rel="stylesheet"/>
      </Head>
      <Box
      backgroundColor={currentMode ==="dark" ? "black" : "white"}  borderBottomLeftRadius="1px"
        position={isFixed ? 'fixed' : 'static'}
        top={isFixed ? 0 : 'auto'}
        boxShadow={isFixed ? 'sm' : 'none'}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={5}
        borderRadius="md"
        zIndex={10}
      >
        <Text
          fontFamily="Ubuntu"
          fontSize="1em"
          fontWeight="bold"
          textAlign="left"
          ml={4}
          color={currentMode==="light" || currentMode === null ? "black" : "white"}
        >
          MylesVTU
        </Text>
        
        <Box onClick={changeMode}>{currentMode ==="light" || currentMode === null ? (<FiMoon size={30} color="#657ce0" cursor="pointer" />) : (<FiSun size={30} color="#657ce0" cursor="pointer" />)}</Box>

       <Box> <Image src="/avater.jpeg" alt="Profile Picture" boxSize="50px" borderRadius="50%"  /></Box>

      </Box>
    </>
  );
};

export default Header;
