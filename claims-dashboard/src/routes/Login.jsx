import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData, setLoading) => {
    try {
      const res = await axios.get(`http://localhost:3001/users?email=${formData.email}`,  {
        headers: { Authorization: 'Bearer dummy-token' },
      });
      if (res.data.length === 0 || res.data[0].password !== formData.password) {
        setError("Invalid email or password.");
      } else {
        localStorage.setItem("token", "dummy-token");
        navigate("/dashboard");
      }
    } catch {
      setError("Login failed. Try again.");
    }
    setLoading(false);
  };

  return <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} error={error} link={'signup'} />;
};

export default Login;
