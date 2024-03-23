import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image } from '@chakra-ui/react';

const Adverts = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YZlN4HFys6NdcDj1Azbe2lJRgSWs-tRDwQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBRZwcdumfCgnlaCiyPEQfjYRe_XrVkEbLA&usqp=CAU',
    'image3.jpg',
    'image4.jpg'
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 // adjust as needed
  };

  return (
    <Box my={5}>
      
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <Image w="100%" h="60px" src={image} alt={`Slide ${index}`} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Adverts;
