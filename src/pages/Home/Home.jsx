import { useState, useEffect } from "react";
import PopularMovies from "./PopularMovies";
import Features from "./Features";
import FeaturedMovie from "./FeaturedMovie";
import { fetchFeaturedMovie } from "../../services/movieUtils";

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    fetchFeaturedMovie(setFeaturedMovie);
  }, []);

  useEffect(() => {
    if (featuredMovie?.backdrop_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`;
      img.onload = () => setBackgroundLoaded(true);
    }
  }, [featuredMovie]);

  return (
    <div className="bg-gray-900">
      {featuredMovie && (
        <>
          <FeaturedMovie
            backgroundLoaded={backgroundLoaded}
            featuredMovie={featuredMovie}
          />
        </>
      )}

      <PopularMovies />

      <Features />
    </div>
  );
};

export default Home;
