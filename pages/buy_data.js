import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarBottom from "../components/navbarBottom";
import Header from '../components/header';
import $ from 'jquery';
import { FallingLines,Rings } from 'react-loader-spinner';
import { ChakraProvider, Box, Flex, Heading, Input, Select, Button, Center,Spinner,Container } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userData,csrfToken,pageLoading,thisPage,mode } from "../components/recoil";
import Head from "next/head";


const Data = () => {
  const router = useRouter();
  const [input, setInput] = useState({ network: "mtn" });
  const [btnLoading, setBtnLoading] = useState(false);
  const data = useRecoilValue(userData);
  const setData = useSetRecoilState(userData);
  const csrf = useRecoilValue(csrfToken);
  const setCsrf = useSetRecoilState(csrfToken); 
  const [spin, setSpin] = useState(true);
  const [selected, setSelected] = useState(null);
  const [network, setNetwork] = useState('mtn');
const loadingPage = useRecoilValue(pageLoading);
const setLoadingPage = useSetRecoilState(pageLoading);
  const currentPage = useRecoilValue(thisPage);
const setCurrentPage = useSetRecoilState(thisPage);
  const currentMode = useRecoilValue(mode);
  const setMode = useSetRecoilState(mode);
//const boxPadding = useBreakpointValue({ base: 20, sm: 30, md: 40, lg: 50 });

useEffect(() => {
  
  const userChoice = window.localStorage.getItem("mode");

  if(userChoice === "dark"){
  setMode("dark");
  }
  else{
    setMode("light");
  }

},[]);
  
  useEffect(()=>{
setCurrentPage("buy_data");
setLoadingPage(false);

},[]);
    

  useEffect(() => {
    
   // if (!csrf) {
    //alert(4)
      const url = 'https://mylesvtu.com.ng/app/store/welcome';
      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        //crossDomain: true,
        success: function (r, status, xhr) {
          //const dataBundle = r.data.dataBundle;
         const profile = r.data.profile;
          const dataBundle = r.data.dataBundle;
          setData({ profile: profile, dataBundle: dataBundle
                  });
        //  setData({ dataBundle: dataBundle });
          setSpin(false);
          
           setCsrf(r.token);
//console.log(data.profile.phoneNumber);
        //  console.log("csrf id ",csrf);
        },
        error: function () {
          //showAlert("Server is down", "warning");
        },
      });
  //  }
  }, []);
//console.log(data);
  const bundle = data.dataBundle || {};
  const airtel = bundle.airtel || [];
  const mtn = bundle.mtn || [];
  const etisalat = bundle.etisalat || [];
  const glo = bundle.glo || [];


  const getInput = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
    setInput((prev) => ({ ...prev, ['csrf']: csrf }));
  }

  const showAlert = (message, type) => {
    toast[type](` ${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     // progress: 100,
      theme: "light",
     // toastId:"data",
    });
    setBtnLoading(false);
  }

  const buyData = () => {
    if (Object.keys(input).length < 3) {
      showAlert("Please fill all fields appropriately!!!", "info");
      return;
    }
    setBtnLoading(true);

    const updatedInput = { ...input, ['csrf']: csrf };
    
      const url = "https://mylesvtu.com.ng/app/store/buy_data";
    $.ajax({
      url: url,
      method: 'post',
      dataType: 'json',
      data: updatedInput,
      success: function (r) {
        setBtnLoading(false);
        //console.log(r)
        //alert(r.token);
        setCsrf(r.token);
        if (r.status === 1) {
          showAlert("Thank You... Your order has been processed!!", "success");
        } else {
          showAlert("Oop!!! "  +r.msg+ " If problem persists,do contact us. Thanks...", "info");
        }
        setBtnLoading(false);
      },
      error: function () {
        showAlert("Internet connection seems to be Lost or the Server cannot be reached. Please Try again.", "info");
        setBtnLoading(false);
      }
    });
  }

  const selectItem = (item) => {
    setSelected(item);
  }

  const chooseNetwork = (choice) => {
    
    setNetwork(choice);
    setSelected(null);
    setInput((prev) => ({ ...prev, ['network']: choice }));
  }

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  const styles = {
    planSelected: {
      backgroundColor: '#656ce0',
      color: 'white'
    }
  }

  let dataPlansDetails;

  if (network === "mtn") {
    dataPlansDetails = mtn;
  } else if (network === "airtel") {
    dataPlansDetails = airtel;
  } else if (network === "glo") {
      dataPlansDetails = glo;
    } else {
    dataPlansDetails = etisalat;
  }
const dataPlansDetail = [
  {
    product: "1gb",
    price: 500,
  },
  {
    product: "2gb",
    price: 750,
  },
  {
    product: "3gb",
    price: 1000,
  },
  {
    product: "4gb",
    price: 1500,
  },
  {
    product: "5gb",
    price: 2000,
  },
  {
    product: "6gb",
    price: 2500,
  },
];

  return (
    <>
      <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Buy Data Plans - MylesVTU</title>
  <meta name="description" content="Purchase affordable data plans with ease at MylesVTU. Browse and choose from a variety of data bundles suitable for your needs. Fast and reliable data buying experience." />
  <meta name="keywords" content="buy data plans, affordable data bundles, MylesVTU, mobile data purchase" />
  <meta name="author" content="MylesVTU" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="generator" content="Your CMS or Development Platform" />

  {/* Open Graph meta tags for social sharing */}
  <meta property="og:title" content="Buy Data Plans - MylesVTU" />
  <meta property="og:description" content="Purchase affordable data plans with ease at MylesVTU. Browse and choose from a variety of data bundles suitable for your needs. Fast and reliable data buying experience." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mylesvtu.com.ng/buy_data" />
  <meta property="og:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />

  {/* Twitter Card meta tags for Twitter sharing */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Buy Data Plans - MylesVTU" />
  <meta name="twitter:description" content="Purchase affordable data plans with ease at MylesVTU. Browse and choose from a variety of data bundles suitable for your needs. Fast and reliable data buying experience." />
  <meta name="twitter:image" content="https://lh3.googleusercontent.com/p/AF1QipMgmurRxYZYbIeskHtFTD_iZ3GCEbxa8nHmEygE=s1348-w720-h1348" />
</Head>

      {currentMode ==="light" || currentMode === "dark" ?(<Header />) :(<></>)}
      <ChakraProvider>

              {loadingPage ? (
            <Center bg={currentMode ==="dark" && "black"} mt="" height="100vh">
            <Box
              position="absolute"
              top="40%"
             bg={currentMode==="dark" && "black"}
              p={4}
              maxW="md"
              borderWidth=",0px"
        borderColor="#657ce0"
              borderRadius="md"
              boxShadow="sm"
              textAlign="center"

            >
              <Spinner speed="0.3s" color="#657ce0" size="lg" />
              
            </Box>
          </Center>): currentMode !== 'light' && currentMode !== 'dark' ? (
                  <> </> // Empty view when mode is not known
                ) : (
         <Container bg={currentMode === "dark" && "black"} color={currentMode ==="dark"&&"white"} h="100vh"  maxW="100vw" m={0}>       
        <Box h="80vh" p={1} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Box boxShadow="" textAlign="center" maxW="550px">
 <Heading as="h1" size="md" fontFamily="sans-serif" mb="4">
              Buy Data
            </Heading>
            <Input
              onChange={(e) => setInput((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              type="tel"
              placeholder="Enter 11 digits number"
              borderRadius="md"
              mb="7"
              size="lg"
              border="1px solid dodgerblue"
                
            />
            <Select onChange={(e) => chooseNetwork(e.target.value)}
              borderRadius="lg"
              mb="4"
              size="lg"
             border="1px solid dodgerblue"
               
            >
              <option value="mtn">MTN</option>
              <option value="airtel">Airtel</option>
              <option value="9mobile">9Mobile</option>
              <option value="glo">Glo</option>
            </Select>

                       {!data.dataBundle && (
  <Flex m={5} justifyContent="center" alignItems="center" flexFlow="row wrap">
    <Rings
  visible={true}
  height="100"
  width="100"
  color="#657ce0"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </Flex>
)}      
            <Flex flexDirection="" flexWrap="wrap"  mb="4">
 

              {dataPlansDetails.map((item, index) => (
                <Box onClick={() => {
                  selectItem(index + 1);
                  getInput('plan', item.product);
                }}
                  key={index}
                  bg={currentMode==="dark"?"black":"white"}
                  color={currentMode==="dark"? "white" : "black"}
                  p="6"
                  borderRadius="lg"
                  m="2" 
                  textAlign="center"
                  width="22"
                  boxShadow="md"
                  style={selected === index + 1 ? styles.planSelected : {}}
                >
                  <Box
                    bg="#657ce0"
                    width="25px"
                    height="2px"
                    borderRadius="2%"
                    mb="4"
                    mx="auto"
                    boxShadow="sm"
                  />
                  <Heading as="h5" fontSize="15px" size="sm" mb="2" fontWeight="bold" fontFamily="sans-serif">
                    {item.product}
                  </Heading>
                  <Heading as="h5" size="sm" fontWeight="normal" fontSize="12px" fontFamily="sans-serif">
                    ₦{item.price}
                  </Heading>
                </Box>
              ))}
            </Flex>
            <Box ml={36} textAlign="center" justify="center" align="center" display={`${btnLoading ? "block" : "none"}`}>
              <FallingLines
                color="#657ce0"
                width="50"
                visible={true}
                ariaLabel='falling-lines-loading'
              />
            </Box>
            <Button onClick={buyData}
              bgColor="#657ce0"
              color="white"
              size="lg"
              width="100%"
              borderRadius="md"
              fontFamily="sans-serif"
              fontWeight="bold"
              mt="4"
              boxShadow="md"
              display={`${btnLoading ? "none" : "block"}`}
            >
              Buy
            </Button>
          </Box>
        </Box>
        </Container>)}
      </ChakraProvider>
      <ToastContainer />
      {currentMode === "light" || currentMode ==="dark" ?(<NavbarBottom />) :(<></>)}
    </>
  );
};

export default Data;
