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
        // Retrieve token from localStorage or use the token from Redux store
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token || tokenFromRedux;

        // Set up headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/tests/",
          config
        );
        setTests(response.data); // Directly use response.data
        console.log(response.data); // Log the data to check its structure
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [tokenFromRedux]); // Add tokenFromRedux to dependencies

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
      <ul>
        {tests.map((test) => (
          <li
            key={test._id}
            className="mb-2"
          >
            <Link
              to={`/test/${test._id}`}
              
            >
              {test.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestsPage;
