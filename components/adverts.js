import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image } from '@chakra-ui/react';

const Adverts = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YZlN4HFys6NdcDj1Azbe2lJRgSWs-tRDwQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBRZwcdumfCgnlaCiyPEQfjYRe_XrVkEbLA&usqp=CAU',
    'https://st.depositphotos.com/49078592/53424/i/450/depositphotos_534247820-stock-illustration-hand-writing-sign-hire-us.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRTRjjRv9TJx164vNwc2YLBRt8ybMad1rPbw&usqp=CAU',
    'https://myoperator.com/blog/wp-content/uploads/2023/03/image-1.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGYNA71rY7b6aqoKJ_onWkNbQTqW4IDlBGA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyARTaVRhH_29mL1Op2StZ-iZvVwqFAblmA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBrYh7eZRH0aUjPP9g5b_Z2ntDeVElyiWWLA&usqp=CAU',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // adjust as needed
    customPaging: function(i) {
      return (
        <button style={{color: 'blue'}}>{i + 1}</button>
      );
    },
  };

  return (
    <Box boxShadow="md" m="1.5em">
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <Image w="100%" h="6em" src={image} alt={`Slide ${index}`} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Adverts;
