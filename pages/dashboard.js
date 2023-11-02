import React, {useState,useEffect } from 'react';
import Header from '../components/header';
import Wallet from '../components/wallet';
import Menu from '../components/menu';
import Transactions from '../components/transactions';
import Adverts from '../components/adverts';
import NavbarBottom from '../components/navbarBottom';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
//import Data from '../components/data';
import { Box, Button, Center, ChakraProvider, Text, Container } from '@chakra-ui/react';
import { FiFrown } from "react-icons/fi";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState,useRecoilState } from "recoil";
import { loginStatus, userData } from "../components/recoil";
import { useRouter } from "next/router";
import  Transition  from '../components/transition';

  

export default function Dashboard() {
  
  const [isLoading, setLoading] = useState(false);
  
  const logged = useRecoilValue(loginStatus);

  const setLogged = useSetRecoilState(loginStatus);
  const setData = useSetRecoilState(userData);
  //const[data,setData] = useRecoilState(userData);
  const [spin,setSpin] = useState(true);

  const router = useRouter();

  useEffect(()=>{

   const spin = setTimeout(()=>{
     setSpin(false);
    // router.push("/dashboard");
   },2000);

return ()=>{

  clearTimeout(spin);
}

  },[setSpin]);


  useEffect(() => {
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
        else{
router.push("/login")
        }
      },
      error: function () {
        showAlert("Server is down", "warning");
      },
    });
  }, [setLogged, setData]);

  const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  /*
  useEffect(() => {
    if (isLoading) {
      const set = setTimeout(() => {}, 2500)
      return () => clearTimeout(set);
    }
  }, [isLoading, setLoading])
*/
   if (!logged) {
    //setSpin(true);
    return (
      <Transition/>
    );
  }

  return (
    <>
      { !spin ? (
    <Container textAlign="center" h="100vh">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Wallet />
            <Menu />
            <Transactions />
          </div>
        </div>
        <NavbarBottom />
      </div>
    </Container>) :
        (<Transition/>)
        }
</>
  );
}
