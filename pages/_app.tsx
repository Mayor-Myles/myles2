import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {RecoilRoot} from "recoil";
import {ChakraProvider} from "@chakra-ui/react";
//import{useSetRecoilState} from "recoil";
//import{loginStatus} from "../components/recoil";
import {useEffect} from "react";
//import $ from "jquery"
//import {Head} from "next/head"


function MyApp({ Component, pageProps }: AppProps) {

//const currentMode = window.localStorage.getItem("mode");
  
  useEffect(() => {
    const currentMode = window.localStorage.getItem("mode");
  // alert(currentMode);
    
    //User hasn't chosen preffered mode
    if (currentMode !== "dark") {  
      window.localStorage.setItem("mode", "light");
      
    }


    
  }, []);

  return(
    <>
      
    <RecoilRoot>
      
        <Component {...pageProps} />
        
    </RecoilRoot>
    </>
    )
}

export default MyApp
