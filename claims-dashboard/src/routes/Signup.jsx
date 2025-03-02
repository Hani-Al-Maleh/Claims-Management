import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (formData, setLoading) => {
    try {
      const res = await axios.post("http://localhost:3001/users", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 201) {
        navigate("/login");
      }
    } catch {
      setError("Signup failed. Try again.");
    }
    setLoading(false);
  };

  return <AuthForm title="Sign Up" buttonText="Sign Up" onSubmit={handleSignup} error={error} link={'login'} />;
};

export default Signup;
