'use client'

import { useRouter } from "next/navigation";

export default   function  Home() {
 
 const router=useRouter()
   
  
  
  return (<div>
    <h1 className=" bg-purple-400">Welcome!Hope you will visit all pages</h1>
    <button className="p-1 bg-slate-600 text-white" onClick={()=>router.push("/login")}>login </button>
    </div>
  );
}