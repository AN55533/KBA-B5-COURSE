import { React,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import reg from "../assets/images/regdoct.jpg";
import { useAuth } from "../context/AuthContext";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await login(username, password); 
        toast.success("Welcome back!");
        navigate("/admindashboard", { replace: true });
      } catch (err) {
        setError(err.message || "Invalid credentials: Please try again!");
      }
    };

  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${reg})` }}
      ></div>

      <div className="w-1/2 bg-blue-100 flex flex-col justify-center p-10">
        <h1 className="font-bold text-[30px] mb-4">Admin Login</h1>
        <p className="text-[20px] mb-6">Please Enter Your Details</p>
        <form onSubmit={handleLogin}>
          <div className="w-[350px] border border-gray-300 p-6 bg-white rounded-lg shadow">
            <label className="block text-blue-600 mb-2">User Name</label>
            <input
              type="text"
              className="border border-gray-300 w-full p-2 text-gray-800 rounded hover:bg-blue-50 hover:border-blue-800 mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="block text-blue-600 mb-2">Password</label>
            <input
              type="password"
              className="border border-gray-300 w-full p-2 text-gray-800 rounded hover:bg-blue-50 hover:border-blue-800 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link to="/admindashboard">
              <button className="h-10 w-full bg-blue-900 text-white text-[18px] rounded hover:bg-blue-500">
                Login
              </button>
            </Link>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
