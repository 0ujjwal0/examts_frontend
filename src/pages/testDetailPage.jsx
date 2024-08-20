import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import VideoPreview from "../components/videopreview";

const TestDetail = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        // Retrieve token from localStorage or use the token from Redux store
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token;

        // Set up headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:5000/api/tests/${testId}`,
          config
        );
        setTest(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test details:", error);
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [testId]);

  const handleStartTest = () => {
    navigate(`/test/${testId}/start`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!test) {
    return <div>Test not found.</div>;
  }

  return (
    <div className="">
      <div className="mb-4 bg-gradient-to-t from-blue-400 to-blue-800  flex justify-between  ">
        <h1 className="text-2xl text-white font-semibold p-4">{test.title}</h1>
        <p className="text-lg text-white font-semibold p-4">
          Duration: {test.duration} minutes
        </p>
      </div>
      <div className=" bg-fuchsia-600 h-screen flex justify-evenly">
        {/* <VideoPreview /> */}
        <div className="w-3/4 bg-green-100">
          <p className="mb-4">{test.description}</p>
        </div>
        <div className=" bg-black">
          <div>gg'</div>
          <button
            onClick={handleStartTest}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDetail;
