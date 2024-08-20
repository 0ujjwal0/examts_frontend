import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authslice";

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, confirmpass } = formData;

    if (!name || !email || !password || !confirmpass) {
      toast.warning("Please fill out all fields!", { autoclose: 2000 });
      setLoading(false);
      return;
    }

    if (password !== confirmpass) {
      toast.error("Passwords do not match", { autoclose: 2000 });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/",
        { name, email, password },
        config
      );
      toast.success("Registration Successful", { autoclose: 2000 });
      localStorage.setItem("userData", JSON.stringify(data));
      dispatch(loginSuccess(data));

      setLoading(false);
      navigate("/tests");
    } catch (error) {
      toast.error("An error occurred during registration", { autoclose: 2000 });
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          className="block py-3 px-4 w-full text-md  bg-transparent border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={formData.name}
          onChange={handleChange}
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          className="block py-3 px-4 w-full text-md  bg-transparent border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={formData.email}
          onChange={handleChange}
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="password"
          className="block py-3 px-4 w-full text-md  bg-transparent border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="confirmpass"
          className="block py-3 px-4 w-full text-md  bg-transparent border-b-2 rounded-lg appearance-none focus:outline-none focus:ring-none focus:border-none peer"
          placeholder=" "
          value={formData.confirmpass}
          onChange={handleChange}
        />
        <label
          htmlFor="confirmpass"
          className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
      </div>

      <button
        type="submit"
        className="px-2 py-1 rounded-full hover:border border-rose-300 hover:text-rose-200 text-gray-800"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
