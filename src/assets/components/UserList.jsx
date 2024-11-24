import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  // State to store the list of users
  const [listOfUsers, setListOfUsers] = useState([]);

  // State to handle loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect hook to fetch users when component mounts
  useEffect(() => {
    // JSONPlaceholder API endpoint for users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setListOfUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array so this effect runs once on mount

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading users...
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl font-bold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listOfUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-600 mb-1">Username: {user.username}</p>
            <p className="text-gray-600 mb-1">Email: {user.email}</p>
            <p className="text-gray-600">Company: {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
