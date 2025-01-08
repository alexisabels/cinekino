import WatchedMovies from "../../components/WatchedMovies";
import { useAuth } from "../../services/AuthProvider";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-boldp-4">Mi Perfil</h1>
      <WatchedMovies user={user} />
    </div>
  );
};

export default Profile;
