"use client"
import axios from 'axios'
import React, { useState } from 'react'

export default function Page() {
 
  const[massage,setMassage]=useState("Enter the details of the car that you want to add the dataBase or go to read to see the details");
  const[loading,setLoading]=useState(false);
  const [user,setUser]= React.useState({
    carName:"",
    Year:"",
    Price:""
  })
 
  const SubmitForm= async (e:any)=>{
    e.preventDefault();
    try {
      const res= await axios.post("/api/users/create",user);
      setLoading(true);
      setMassage("congratulations details added successfully");
    } catch (error:any) {
      setMassage("error occured");
    }


  }
  
  return (
    <div className='bg-black'>
      
      <h1 className='text-green-500 bg-slate-600'>{massage}</h1>
<form className="max-w-sm mx-auto">
  
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CarName</label>
    <input  type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required 
     onChange={(e)=>setUser({...user,carName:e.target.value})}
    />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manufactoring Year</label>
    <input  type="text" id="Number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
     onChange={(e)=>setUser({...user,Year:e.target.value})}/>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input  type="text" id="password" 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
    required 
    onChange={(e)=>setUser({...user,Price:e.target.value})}
    />
    
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
   onClick={SubmitForm}>Submit</button>
</form>

    </div>
  )
}