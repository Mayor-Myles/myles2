import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image } from '@chakra-ui/react';

const Adverts = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwX19JuyuhOmNJat6xrPx-AuakYHf-SbmC_Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3tlODApQpYTQnKRMo6sm9jn0I9fsX7atWHA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNToYlkezrP9Ynd_peA4yVGD5KuNoAXmqmoA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXAV6d-i8Gt-q4nrgH0dN8qqrP5hsqgTYtg&usqp=CAU',
    '',
    '',
    '',
    '',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // adjust as needed
    /*customPaging: function(i) {
      return (
        <button style={{color: 'blue'}}>{i + 1}</button>
      );
    },*/
  };

  return (
    <Box boxShadow="md" m="1.8em">
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <Image w="100%" h="7em" src={image} alt={`Slide ${index}`} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Adverts;
