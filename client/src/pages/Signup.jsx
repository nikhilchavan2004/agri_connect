import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await axios.post(`/api/auth/signup`, formData);
      if (res?.data?.success) {
        alert(res?.data?.message);
        navigate("/login");
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(6,95,15,1) 0%, rgba(56,142,60,1) 50%, rgba(129,199,132,1) 100%)",
        backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border-2 border-green-700 rounded-lg p-4 w-72 h-fit gap-3 sm:w-[350px] bg-white bg-opacity-90 shadow-lg">
          <h1 className="text-3xl text-center font-semibold text-green-800">AGRI CONNECT</h1>
          <p className="text-center text-green-700 font-medium -mt-2 mb-1">Join our farming community</p>
          
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold text-green-900">
              Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your username"
              className="p-2 rounded-md border border-green-300 bg-white bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-green-900">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="p-2 rounded-md border border-green-300 bg-white bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-green-900">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="p-2 rounded-md border border-green-300 bg-white bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold text-green-900">
              Address:
            </label>
            <textarea
              maxLength={200}
              id="address"
              placeholder="Your farm address"
              className="p-2 rounded-md border border-green-300 resize-none bg-white bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold text-green-900">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Your contact number"
              className="p-2 rounded-md border border-green-300 bg-white bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
          
          <p className="text-green-700 text-sm hover:underline">
            <Link to={`/login`}>Have an account? Login</Link>
          </p>
          
          <button className="p-3 text-white bg-green-700 rounded-md hover:bg-green-800 transition duration-300 font-medium shadow-md">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;