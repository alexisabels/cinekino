import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./src/pages/Movies/Movies";

import Auth from "./src/pages/Auth/Auth";
import Home from "./src/pages/Home/Home";
import MovieDetails from "./src/pages/Movies/MovieDetails/MovieDetails";
import Navbar from "./src/components/Navbar";
import User from "./src/pages/u/User";
import { AuthProvider } from "./src/services/AuthProvider";

const Rutas = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/u/:username" element={<User />} />
            <Route
              path="/people"
              element={<h1>Página en construcción...</h1>}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default Rutas;
