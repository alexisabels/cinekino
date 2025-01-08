/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Importa los estilos de navegación
import { Navigation } from "swiper/modules";

const ImageSlider = ({ images }) => {
  return (
    <div className="max-w-screen-xl lg:max-w-7xl mt-10 mx-auto px-4">
      <h2 className="text-4xl text-slate-200 font-extrabold tracking-tight md:text-5xl lg:text-4xl mb-6">
        Imágenes
      </h2>

      <Swiper
        modules={[Navigation]} // Agrega el módulo de navegación
        spaceBetween={10} // Espacio entre las imágenes
        navigation // Activa los controles de navegación
        breakpoints={{
          320: {
            slidesPerView: 1, // En pantallas pequeñas, muestra 1 imagen
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2, // En pantallas medianas, muestra 2 imágenes
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // En pantallas grandes, muestra 3 imágenes
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4, // En pantallas muy grandes, muestra 4 imágenes
            spaceBetween: 40,
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
