import { Image, Container } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay, EffectFade, Pagination, Navigation]);

export default function Adverts() {
  const images = [
    
    '/advert2.jpg',
    '/advert3.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTKK4-ja1SZ-cmxoYmVvKzXMdhA2Gb6CHRg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHSgvHNaAzXN5AQzAYR-PgZpoPnJAjwWDWA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcBfrr3EXfA1KQhBMLImnDWpi2SpUFJENItg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1mGdzcBKqEJRgYgxr4O2Rgq14aNiBhkMJQ&usqp=CAU',
  ];

  return (
    <Container m="2em">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay
        pagination={{ clickable: true }}
        effect="slide"
         
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              w="100%"
              h="50%"
              objectFit="contain"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
