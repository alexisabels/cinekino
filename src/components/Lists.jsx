/* eslint-disable react/prop-types */
import { useState } from "react";
import ProfileMenuMovies from "./ProfileMenuMovies";
import WatchedMovies from "./WatchedMovies";
import WatchListMovies from "./WatchListMovies";

function Lists({ user }) {
  const [selectedMenu, setSelectedMenu] = useState("watched");

  return (
    <>
      <ProfileMenuMovies
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
        {user ? (
          <>
            {(() => {
              switch (selectedMenu) {
                case "watched":
                  return <WatchedMovies user={user} />;
                case "watchlist":
                  return <WatchListMovies user={user} />;
                case "favoritas":
                  return <p>Esta funcionalidad se añadirá próximamente</p>;
                default:
                  return null;
              }
            })()}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Esta cuenta no existe</h1>
            <p>Intenta hacer otra búsqueda.</p>
          </>
        )}
      </div>
    </>
  );
}

export default Lists;
