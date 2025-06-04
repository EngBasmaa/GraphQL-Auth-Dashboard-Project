import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { GET_USERS_WITH_COMPANY } from "../graphql/queries";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    age: "",
    companyId: ""
  });
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS_WITH_COMPANY }]
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addUser({
        variables: { ...formData, age: parseInt(formData.age) }
      });
      alert("User added successfully");
      setFormData({ firstName: "", age: "", companyId: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-6">
        <Link
          to="/dashboard"
          className="inline-block mt-10 ml-10 mb-6 px-5 py-2 rounded-md bg-[#D84040] text-white font-semibold shadow-md hover:bg-[#A31D1D] transition-colors duration-300"
        >
          ← Back to Dashboard
        </Link>
         <Link
                  to="/add-user"
                  className="px-5 py-2 ml-10 rounded-md bg-[#D84040] text-white font-semibold shadow-md hover:bg-[#A31D1D] transition-colors duration-300"
                >
                  Add User
                </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-4 p-8 rounded-xl shadow-lg bg-[#ECDCBF] space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-[#A31D1D] text-center">Add User</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full px-4 py-3 border-2 border-[#D84040] rounded-md focus:outline-none focus:ring-4 focus:ring-[#A31D1D] transition"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full px-4 py-3 border-2 border-[#D84040] rounded-md focus:outline-none focus:ring-4 focus:ring-[#A31D1D] transition"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="companyId"
          placeholder="Company ID"
          className="w-full px-4 py-3 border-2 border-[#D84040] rounded-md focus:outline-none focus:ring-4 focus:ring-[#A31D1D] transition"
          value={formData.companyId}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D84040] hover:bg-[#A31D1D] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add User"}
        </button>

        {error && (
          <p className="text-center text-red-700 font-medium">{error.message}</p>
        )}
      </form>
    </>
  );
};

export default AddUser;
