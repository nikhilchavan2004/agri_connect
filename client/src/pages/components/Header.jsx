
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfileImg from "../../assets/images/profile.png";
import {  Leaf, Home, Search, Info, User } from "lucide-react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="bg-green-700 p-5 flex justify-between items-center shadow-md">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <Leaf className="text-yellow-300 w-8 h-8 mr-2" />
          <h1
            className="h-min text-4xl font-bold relative"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px",
              WebkitTextStrokeColor: "#fff",
            }}
          >
            
            <span
            className="bg-yellow-400 px-3 py-1 rounded-lg text-green-800 text-2xl absolute left-[1rem] top-[-2.2rem] text-center font-extrabold hidden sm:inline"
            style={{
              WebkitTextStroke: "0",
            }}
          >
            AGRI CONNECT
          </span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <ul className="flex items-center justify-end gap-6 text-white font-semibold list-none relative right-[3rem]">
          <li className="hover:underline hover:scale-105 transition-all duration-150 flex items-center">
            <Home className="w-5 h-5 mr-1" />
            <Link to={`/`}>Home</Link>
          </li>
          <li className="hover:underline hover:scale-105 transition-all duration-150 flex items-center">
            <Search className="w-5 h-5 mr-1" />
            <Link to={`/search`}>Products</Link>
          </li>
      
          <li className="hover:underline hover:scale-105 transition-all duration-150 flex items-center">
            <Info className="w-5 h-5 mr-1" />
            <Link to={`/about`}>About</Link>
          </li>
          <li className="w-10 h-10 flex items-center justify-center ml-8">
            {currentUser ? (
              <Link
                to={`/profile/${
                  currentUser.user_role === 1 ? "admin" : "user"
                }`}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={currentUser.avatar || defaultProfileImg}
                  alt={currentUser.username}
                  className="relative border-2 w-10 h-10 border-yellow-400 rounded-full object-cover"
                />
              </Link>
            ) : (
              <Link 
                to={`/login`} 
                className="flex items-center bg-yellow-400 text-green-800 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition duration-300"
              >
                <User className="w-5 h-5 mr-1" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;