/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function FeaturedMovie({ backgroundLoaded, featuredMovie }) {
  return (
    <>
      {!backgroundLoaded && (
        <div className="min-h-[70vh] w-full flex items-center justify-center bg-gray-700 animate-pulse">
          <div
            role="status"
            className="flex items-center justify-center h-56 w-full bg-gray-700 animate-pulse"
          >
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div
        className={`relative min-h-[70vh] flex items-end pb-10 ${
          !backgroundLoaded ? "hidden" : ""
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bienvenido a CineKino
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Tu plataforma para descubrir y seguir tus películas favoritas
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/movie/${featuredMovie.id}`}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
              >
                Ver destacada: {featuredMovie.title}
              </Link>
              {/* <Link
                to="/movies"
                className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
              >
                Explorar películas
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedMovie;
