import { Image, Container } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Autoplay, EffectFade, Pagination, Navigation]);

export default function Adverts() {
  const images = [

    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5PtfAlT80iIHfS72YxBEMdjFCQF7lvuwNQw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzfxtsCPrM6FYeNSfxsXrG21ZcI3BO3c_Ag&usqp=CAU",
     "https://www.infomazeelite.com/wp-content/uploads/2021/02/Hire-Azure-DevOps-Engineers.png",
    
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/297679841/original/ef10bca92725bb87c3a73549dfba5b0b4a053717/setup-a-converting-ad-for-your-business.png",
    ];

  return (
    <Container m="2em">
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{delay:1200}}
        pagination={{ clickable: true }}
        effect="slide"
         
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              w="1000px"
              h="60px"
             objectFit="cover"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
