import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image } from '@chakra-ui/react';

const Adverts = () => {
  const images = [
    'image1.jpg',
    'image2.jpg',
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
    <Box>
      
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
