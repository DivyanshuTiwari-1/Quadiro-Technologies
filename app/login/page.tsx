"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        if (!user.email || !user.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log(response);
           if(response.data.success){
            console.log("Login success", response);
            toast.success("Login success");
            router.push("/home");
           }
           else {
            router.push("/signup");
           }
        } catch (error: any) {
            console.log("Error occurred", error.message);
            toast.error("Login failed");
            router.push("/signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Assignment for Quadiro Technologies</h3>
                <label htmlFor="text" className="mt-1 text-center text-gray-500 dark:text-gray-400">Login</label>
                <div className="w-full mt-4">
                    <input
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="email@domain.com"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="w-full mt-4">
                    <input
                        type="password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <Link href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</Link>
                    <button
                        onClick={onLogin}
                        className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </div>
                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account?</span>
                    <Link href="/signup" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</Link>
                </div>
            </div>
        </div>
    );
}
