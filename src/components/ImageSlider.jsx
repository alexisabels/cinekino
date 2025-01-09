/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ImageSlider = ({ images }) => {
  return (
    <div className="max-w-screen-xl lg:max-w-7xl mt-10 mx-auto px-4 w-full">
      <h2 className="text-4xl text-slate-200 font-extrabold tracking-tight md:text-5xl lg:text-4xl mb-6">
        Imágenes
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="w-full"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-white">No hay imágenes disponibles.</p>
        )}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
