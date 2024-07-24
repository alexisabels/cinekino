import LoginButton from "../../components/LoginButton";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Inicia sesión</h1>
        <LoginButton />
      </div>
    </div>
  );
};

export default AuthPage;
