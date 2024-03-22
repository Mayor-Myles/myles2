import { useEffect, useState } from "react";
import Header from '../components/header';
import Wallet from '../components/wallet';
import Menu from '../components/menu';
import Transactions from '../components/transactions';
import NavbarBottom from '../components/navbarBottom';
import Head from "next/head";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginStatus, userData, thisPage, mode } from "../components/recoil";
import { useRouter } from "next/router";
import { Box, Button, Center, ChakraProvider, Text, Container,Spinner,Flex } from '@chakra-ui/react';


export default function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  const logged = useRecoilValue(loginStatus);
  const setLogged = useSetRecoilState(loginStatus);
  const setData = useSetRecoilState(userData);
  const setCurrentPage = useSetRecoilState(thisPage);
  //const setMode = useSetRecoilState(mode);
  const router = useRouter();
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.data && data.data.isLogged) {
          setLogged(data.data.isLogged);
          const { profile, dataBundle } = data.data;
          setData({ profile: profile, dataBundle: dataBundle });
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or show alert
      }
    };

    if (!logged) {
      fetchData();
    }
  }, [logged, setLogged, setData, router]);

  useEffect(() => {

    
    const userChoice = currentMode === null ? "light" : localStorage.getItem("mode"); 
    setMode(userChoice);
    setCurrentPage("home");
  }, [setMode, setCurrentPage]);

  return (
    <>
      <Head>
        <title>mylesVTU — cheap data, airtime and hire web developer and graphics designer</title>
      </Head>
      <Container color={currentMode ==="dark" && "white"} bg={currentMode ==="dark" ? "black" : "white"}  h="100vh">
        <Header />
    <Wallet />
     <Menu />
    {/* <Transactions />*/}
        <NavbarBottom />
      </Container>
    </>
  );
}
