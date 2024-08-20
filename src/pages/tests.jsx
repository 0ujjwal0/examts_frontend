import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const tokenFromRedux = useSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token || tokenFromRedux;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/tests/",
          config
        );
        setTests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [tokenFromRedux]);

  return (
    <div className="p-6 flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
        <ul className="flex flex-wrap justify-center gap-6 lg:gap-10 h-auto lg:h-80 w-full">
          {tests.map((test) => (
            <li
              key={test._id}
              className="mb-4  w-full sm:w-2/5 lg:w-1/4 bg-gradient-to-t from-gray-300 to-blue-800 border-b-4 border-gray-400 shadow-md rounded-xl flex flex-col justify-end items-center hover:shadow-xl hover:shadow-black-400"
            >
              <img
                src="https://thumbs.dreamstime.com/b/rocket-launch-out-book-illustration-isolated-blue-background-vector-concept-education-226179242.jpg"
                alt=""
                className="h-full rounded-lg"
              />
              <div className="text-gray-700 font-semibold border-b-2 border-gray-400 p-1 mb-4 text-center">
                {test.title}
              </div>
              <div>
                <Link
                  className="bg-gray-200 text-gray-700 rounded-md mt-4 px-3 hover:shadow-xl hover:bg-gray-400 hover:text-gray-200 hover:shadow-[#47d5dc]"
                  to={`/test/${test._id}`}
                >
                  Select Test
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:2/3 lg:w-1/3 flex justify-center lg:justify-start">
        <div className="bg-white p-6 shadow-md rounded-lg w-full  ">Hi</div>
      </div>
    </div>
  );
};

export default TestsPage;
