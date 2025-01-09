import Rutas from "../routes";
import CreateUsernameModal from "./components/CreateUsernameModal";
import { useAuth } from "./services/AuthProvider";
import Spinner from "./components/Spinner";

function App() {
  const { requiresUsername, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="relative min-h-screen">
      {requiresUsername && <CreateUsernameModal />}
      <div className="bg-gray-900 text-white min-h-screen">
        <Rutas />
      </div>
    </div>
  );
}

export default App;
