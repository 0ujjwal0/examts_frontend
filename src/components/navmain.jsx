import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavMain() {
   const navigate=useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("userData");
      const user = localStorage.getItem("userData");
      if (!user) {
        navigate("/");
      }
    };
  return (
    <>
      <div className="bg-gray-200 flex justify-between items-center h-20 max-w-auto mx-auto px-4 text-white">
        <Link to="/">
          <button className="w-full text-3xl font-bold text-blue-900">
            Examts
          </button>
        </Link>
        <ul className=" flex flex-row ">
          <li>
            <Link to="/">
              <button className="bg-transparent  text-gray-700 font-semibold hover:text-blue-700 py-2 px-4  hover:border-transparent rounded">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="bg-transparent  text-gray-700 font-semibold hover:text-blue-700 py-2 px-4   hover:border-transparent rounded" onClick={handleLogout}>
                logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <hr />
    </>
  );
}

export default NavMain;
