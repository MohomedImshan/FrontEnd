import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EngineerDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/Engineer`);
        // Show only the first user for now
        setUser(res.data.users?.[0] || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Navigation (Do NOT change) */}
      <Header />

      {/* Add Button */}
      <div className="px-8 mt-4">
        <Link className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" to="/Register">
          Add Employee
        </Link>
      </div>

      {/* Engineer Profile Section */}
      <div className="p-8">
        {user ? (
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <div className="flex items-center space-x-8">
              <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
              <div>
                <h1 className="text-3xl font-bold">{user.userName}</h1>
                <p className="text-xl font-semibold text-gray-700">{user.position}</p>
                <p className="text-sm text-gray-500">{user.empNum}</p>
              </div>
            </div>

            <hr className="border-yellow-500 my-6" />

            <div className="space-y-3 text-lg">
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>NIC:</strong> {user.nic}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">Loading engineer profile...</p>
        )}
      </div>
    </div>
  );
}

export default EngineerDashboard;
