"use client"
import axios from 'axios'
import React, { useState } from 'react'

export default function Page() {
  const [message, setMessage] = useState("The details of cars is as below");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      carName: "",
      Year: "",
      Price: ""
    },
  ]);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/read");
      const data = await res.data;
      setUsers(data);
      setMessage("Car details fetched successfully");
      setLoading(true);
    } catch (error) {
      setMessage("Server error occurred");
    }
  }

  return (
    <div className="bg-black">
      <button className='p-1 bg-slate-500 text-white' onClick={fetchData}>Fetch details</button>
      <div className='flex flex-col flex-wrap'>
        {users.map((user, index) => (
          <div key={index}>
            <h3 className='text-pink-700'>Car Name: {user.carName}</h3>
            <h3 className='text-pink-700'>Manufacturing Year: {user.Year}</h3>
            <h3 className='text-pink-700'>Price: {user.Price}</h3>
          </div>
        ))}
      </div>
      <div className="text-white">
        {message}
      </div>
    </div>
  )
}
