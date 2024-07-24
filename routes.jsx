// src/routes.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./src/pages/Movies/Movies";

import People from "./src/pages/People/People";
import Auth from "./src/pages/Auth/Auth";
import Home from "./src/pages/Home/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/people" element={<People />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
