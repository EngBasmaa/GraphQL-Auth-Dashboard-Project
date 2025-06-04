import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/usersList";
import AddUser from "./components/addUser";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen mt-10 pt-5 bg-[#F8F2DE] text-[#A31D1D] font-sans">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
            <div className="max-w-4xl mt-10 mx-auto py-12 px-6 text-center">
              <h2 className="text-3xl font-bold mb-10 text-[#D84040]">
                Dashboard
              </h2>

              <nav className="flex justify-center space-x-6">
                <Link
                  to="/users"
                  className="px-4 py-2 rounded bg-[#D84040] text-white hover:bg-[#A31D1D] transition"
                >
                  Users List
                </Link>
                <Link
                  to="/add-user"
                  className="px-4 py-2 rounded bg-[#D84040] text-white hover:bg-[#A31D1D] transition"
                >
                  Add User
                </Link>
                {isAuthenticated &&
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-800 transition"
                  >
                    Logout
                  </button>}
              </nav>
            </div>
          }
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
