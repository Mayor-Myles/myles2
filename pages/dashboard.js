import {useEffect,useState} from "react";
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
import { Box, Button, Center, ChakraProvider, Text, Container,Spinner,Flex } from '@chakra-ui/react';
import { FiFrown } from "react-icons/fi";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { loginStatus, userData,page,switchData,thisPage ,mode} from "../components/recoil";
import { useRouter } from "next/router";
//import Transition from '../components/transition';
import Head from "next/head";
//import Data from "./buy_data";
//import {progressBar} from "../components/progress";
//import LoadingBar from 'react-top-loading-bar';





export default function Dashboard() {

  const [isLoading, setLoading] = useState(false);

  const logged = useRecoilValue(loginStatus);

  const setLogged = useSetRecoilState(loginStatus);
  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);
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

setCurrentPage("home");
  
},[])
  //const [spin, setSpin] = useState(true);
 // const thisPage = useRecoilValue(page);
 // const setPage = useSetRecoilState(page);
  const router = useRouter();
//const [switching,setSwitching] = useState(false);
  //const setSwitching = useSetRecoilState(switchData);
 //const switchData = {switching,setSwitching}
  
//setSwitching(false);
/*
  useEffect(() => {

    const spin = setTimeout(() => {
      setSpin(false);
    }, 100);

    return () => {
      clearTimeout(spin);
    }

  }, [spin, setSpin]);
*/


  
  useEffect(() => {
    const url = 'https://mylesvtu.com.ng/app/store/welcome';
if(!logged){
 // alert(5);
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
          setData({ profile: profile, dataBundle: dataBundle
                  });
//router.push("/login");
          
        }
        else {
          router.push("/login");
        }
      },
      error: function () {
        //showAlert("Server is down", "warning");
      },
    });
  }
  }, [setLogged, setData]);

  const showAlert = (message, type) => {
    toast[type](`⚡ ${message}`, {
      position: 'top-center',
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      //progress: undefined,
      theme: 'light',
    });
  };

     /*   const refreshData = ()=>{

       const url =  "https://mylesvtu.com.ng/app/store/welcome/";
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      //crossDomain: true,
      success: function (r, status, xhr) {
  
          setLogged(r.data.isLogged);
          const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle
                  });
      },
      error: function () {
        //showAlert("Server is down", "warning");
      },
    });//ajax end

        }

  setInterval(refreshData,180000);
  */




/*
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const incrementProgress = () => {
      if (progress < 100) {
        setProgress(progress + 20); // Adjust the speed of progress here
      }
    };

    const finishProgress = () => {
      setProgress(100);
    };

    window.onload = () => {
      finishProgress();
    };

    const timer = setInterval(() => {
      incrementProgress();
    }, 50); // Adjust the interval for more or less frequent updates

    return () => clearInterval(timer);
  }, [progress]);*/

/*  if(progress < 100 || !logged){
  return (
    <div className="ProgressBar">
      <LoadingBar progress={progress} color='#657ce0' />
      <Flex h="100vh" fontSize="2em" color="#647ce0" justify="center" align="center">Loading...</Flex>
    </div>
  );
  }*/






  return (
    <>
      <Head>

      <title>mylesVTU — cheap data,airtime and hire web developer and graphics designer </title>
        </Head>
      
       <Container color={currentMode ==="dark" && "white"} bg={currentMode ==="dark" ? "black" : "white"}  h="100vh">
          
                   
             <Header /> 
     
                <Wallet />
                <Menu />
    {logged &&  (<Transactions />)}                   
                   <NavbarBottom  />  
        </Container>
      

  
      
    </>
  );
}
