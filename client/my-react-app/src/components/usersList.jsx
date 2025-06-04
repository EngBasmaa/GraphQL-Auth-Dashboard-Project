import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_WITH_COMPANY } from "../graphql/queries";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS_WITH_COMPANY);

  if (loading) 
    return <p className="text-center mt-10 text-[#A31D1D] font-semibold">Loading...</p>;
  if (error) 
    return <p className="text-center mt-10 text-red-600 font-semibold">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-[#F8F2DE] rounded-xl shadow-lg">
      <div className="flex justify-end mb-6">
        <Link
          to="/dashboard"
          className="px-5 py-2 mx-auto rounded-md bg-[#D84040] text-white font-semibold shadow-md hover:bg-[#A31D1D] transition-colors duration-300"
        >
           ← Back to Dashboard
        </Link>

        <Link
          to="/add-user"
          className="px-5 py-2 mx-auto rounded-md bg-[#D84040] text-white font-semibold shadow-md hover:bg-[#A31D1D] transition-colors duration-300"
        >
          Add User
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-[#D84040] text-center">Users List</h2>
      <div className="flex flex-wrap gap-6 justify-center flex-row-reverse">
        {[...data.users].reverse().map((user) => (
          <div
            key={user.id}
            className="flex-shrink-0 w-full sm:w-80 md:w-72 bg-white p-6 rounded-lg border-2 border-[#ECDCBF] shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-sm text-gray-500 mb-1">
              User ID: <span className="font-mono">{user.id}</span>
            </p>
            <p className="text-2xl font-semibold text-[#A31D1D]">{user.firstName}</p>
            <p className="text-[#A31D1D] mt-1">
              <span className="font-medium">Age:</span> {user.age}
            </p>
            <div className="mt-4 p-4 bg-[#ECDCBF] rounded">
              <p className="text-[#A31D1D] font-semibold mb-2">Company Info:</p>
              <p>
                <span className="font-medium">ID:</span>{" "}
                <span className="font-mono">{user.company?.id || "N/A"}</span>
              </p>
              <p>
                <span className="font-medium">Name:</span> {user.company?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Slogan:</span>{" "}
                <em>{user.company?.slogan || "N/A"}</em>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
