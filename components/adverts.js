import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image,Flex } from '@chakra-ui/react';

const Adverts = () => {
  const images = [
 
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAKsrhRw12-j0F5vUYxryPXfmNGHySgPkaA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB1fUkMzMxuNudf6DVO9DobG1V07TZhpZ6AQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaESUG7JhxjsII4jxq8D8wD9JYo-NTSBpKtQ&usqp=CAU',
    'https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS90ZW1wbGF0ZXMvZmlsZXMvY3JlYXRlX3Rvb2wvMjAyMy0wNy8wMWgxdjV2ajhqZDg2MmdnZTE2bTlwY242ay1sa2JwOWdqMy5wbmc.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0CbX31ttm0AQKwpFvDHeVRP2yPkqRoZFoug&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtG53-MHyiD-w6OKl9YbEiWuEgZqsnf5BQw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9H3y0pSExhpF40cFiRRofGwGYJFbRyhiEtQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAKsrhRw12-j0F5vUYxryPXfmNGHySgPkaA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpXcE39N4HX8BKwQD2pCiJ-IePP_SvPY1mJg&usqp=CAU',
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // adjust as needed
  /*  customPaging: function(i) {
      return (
        <Box style={{background: 'blue'}}>*</Box>
      );
    },*/
  };

  return (
    <Box
      boxShadow="md" m="1.8em">
      <Slider {...settings}>
        {images.map((image, index) => (
          <Flex key={index}>
            <Image w="100vw" h="4em" src={image} alt={`Slide ${index}`} />
          </Flex>
        ))}
      </Slider>
    </Box>
  );
};

export default Adverts;
