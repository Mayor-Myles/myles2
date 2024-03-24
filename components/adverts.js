import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image } from '@chakra-ui/react';

const Adverts = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbm2QBOQuJp2BoXmzcuC7jzGTJt7FnLpgR6A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaESUG7JhxjsII4jxq8D8wD9JYo-NTSBpKtQ&usqp=CAU',
    'https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS90ZW1wbGF0ZXMvZmlsZXMvY3JlYXRlX3Rvb2wvMjAyMy0wNy8wMWgxdjV2ajhqZDg2MmdnZTE2bTlwY242ay1sa2JwOWdqMy5wbmc.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXAV6d-i8Gt-q4nrgH0dN8qqrP5hsqgTYtg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQngq62Exu8UgDSYwqju9WVp5xiCKgQQW7n9w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZPLFxC2VH89nI31zNgZvzYQ0KvbbSjgYiKw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpXU9yiuJuCJxXZbnyTP9m2U_vg59OzlUGNg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGE1FYyS5vkLZ5l20NPxoTg2i2sqGvZp1PlA&usqp=CAU',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
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
    <Box boxShadow="md" m="1.8em">
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <Image w="100%" h="5em" src={image} alt={`Slide ${index}`} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Adverts;
