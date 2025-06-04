import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", company: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      formData.name.toLowerCase() === "ahmed" &&
      formData.company.toLowerCase() === "apple"
    ) {
      // Set token in localStorage to mark user as logged in
      localStorage.setItem("token", "authenticated");

      alert(`Welcome ${formData.name} from ${formData.company}! ✅`);
      navigate("/dashboard");
    } else {
      alert("Incorrect credentials ❌\nTry: Name - Ahmed, Company - Apple");
    }
    setFormData({ name: "", company: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow shadow-lg bg-[#ECDCBF]">
      <h2 className="text-2xl font-bold mb-4 text-[#A31D1D]">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border border-[#D84040] rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          className="w-full px-4 py-2 border border-[#D84040] rounded"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-[#D84040] hover:bg-[#A31D1D] text-white px-6 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
