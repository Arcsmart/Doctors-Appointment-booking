import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContex } from "../context/AdminContex"; // Kept as-is
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, backendUrl } = useContext(AdminContex);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.sucess) {
          
          localStorage.setItem('aToken',data.token)
          setToken(data.token);
        }else{
          toast.error(data.message)
        }
      } else {
        // Handle Doctor login logic here if needed
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // You might want to add user-facing error state here
    }
  };

  return (
    // Wrapper to center the form on the page
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex flex-col gap-6">
          <p className="text-3xl font-bold text-center text-gray-800">
            <span className="text-blue-600">{state} </span>
            Login
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Email</p>
            < input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Password</p>
            < input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>

          {state === "Admin" ? (
            <p className="text-center text-sm text-gray-600">
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
