import { Image, Container } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay, EffectFade, Pagination, Navigation]);

export default function Adverts() {
  const images = [
    
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/297679841/original/ef10bca92725bb87c3a73549dfba5b0b4a053717/setup-a-converting-ad-for-your-business.png',
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
              w="600px"
              h="30px"
             
              src={image}
              alt={`Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
