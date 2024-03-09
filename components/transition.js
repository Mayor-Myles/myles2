import { Watch } from "react-loader-spinner";
import Header from "../components/header";
import NavbarBottom from "../components/navbarBottom";
import {useRecoilValue,useSetRecoilState} from "recoil";
import {mode} from "../components/recoil";
import {useEffect} from "react";
import {Center} from "@chakra-ui/react";



export default function Transition() {

  const currentMode = useRecoilValue(mode);
    const setMode = useSetRecoilState(mode);

  useEffect(()=>{


    const userChoice = window.localStorage.getItem("mode");

    if(userChoice === "light"){
    setMode("dark");
    }
    else{
      setMode("light");
    }

  },[])

  
  return (
    <>
      <Header />
      <Center>
      <Watch
  visible={true}
  height="80"
  width="80"
  radius="48"
  color="#657ce0"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </Center>
      <NavbarBottom />
    </>
  )
}
