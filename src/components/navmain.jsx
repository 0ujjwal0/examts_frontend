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
      <div className="bg-gray-200 flex justify-between items-center h-16 max-w-auto mx-auto px-4 text-white">
        <Link to="/">
          <button className="w-full text-3xl font-bold text-violet-900">
            Examts
          </button>
        </Link>
        <ul className=" flex flex-row ">
          <li>
            <Link to="/">
              <button className="hover:bg-violet-500   text-violet-700 font-semibold hover:text-white py-2 px-4 rounded-xl">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button
                className="hover:bg-violet-500   text-violet-700 font-semibold hover:text-white py-2 px-4 rounded-xl"
                onClick={handleLogout}
              >
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
