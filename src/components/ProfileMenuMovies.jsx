/* eslint-disable react/prop-types */
const ProfileMenuMovies = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <div className="flex justify-center items-center z-50">
      <div className="w-full">
        <div
          className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600"
          role="group"
        >
          <button
            type="button"
            className={`px-5 py-1.5 text-xs font-medium rounded-lg ${
              selectedMenu === "watched"
                ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900"
                : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedMenu("watched")}
          >
            Watched
          </button>
          <button
            type="button"
            className={`px-5 py-1.5 text-xs font-medium rounded-lg ${
              selectedMenu === "watchlist"
                ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900"
                : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedMenu("watchlist")}
          >
            Watchlist
          </button>
          <button
            type="button"
            className={`px-5 py-1.5 text-xs font-medium rounded-lg ${
              selectedMenu === "favorites"
                ? "text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900"
                : "text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedMenu("favorites")}
          >
            Favoritas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenuMovies;
