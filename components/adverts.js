import { Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay, EffectFade, Pagination, Navigation]);

export default function Adverts() {
  const images = [
    '/advert1.jpg',
    '/advert2.jpg',
    '/advert3.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTKK4-ja1SZ-cmxoYmVvKzXMdhA2Gb6CHRg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHSgvHNaAzXN5AQzAYR-PgZpoPnJAjwWDWA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcBfrr3EXfA1KQhBMLImnDWpi2SpUFJENItg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1mGdzcBKqEJRgYgxr4O2Rgq14aNiBhkMJQ&usqp=CAU',
  ];

  return (
    <div className="spaceTop">
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1200 }}
        effect="slide"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image w="20em" h="5em" src={image} alt={`Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
