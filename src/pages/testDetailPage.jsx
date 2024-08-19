import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
          `https://localhost:5000/api/tests/${testId}`,
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
      <p className="mb-4">{test.description}</p>
      <p className="mb-4">Duration: {test.duration} minutes</p>
      <button
        onClick={handleStartTest}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Test
      </button>
    </div>
  );
};

export default TestDetail;
