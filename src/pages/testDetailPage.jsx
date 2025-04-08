import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import VideoPreview from "../components/videopreview";

const TestDetail = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tests/${testId}`, //https://examly-backend-znqt.onrender.com/api/tests/${testId}
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
    if (isChecked) {
      navigate(`/test/${testId}/start`);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!test) {
    return <div>Test not found.</div>;
  }

  return (
    <div className="bg-blue-50">
      <nav className="mb-2 bg-gradient-to-t from-blue-300 to-violet-500 flex flex-col lg:flex-row justify-between p-4">
        <div>
          <h1 className="text-2xl text-white font-semibold mb-2 lg:mb-0">
            {test.title}
          </h1>
          <span className="text-violet-800 text-xs font-semibold px-1 ml-4 bg-white rounded-sm">
            {test.description}
          </span>
        </div>
        <p className="text-lg text-white font-semibold">
          {test.duration} minutes
        </p>
      </nav>
      <form className="h-screen flex flex-col lg:flex-row justify-evenly p-4 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-4/5 bg-blue-200 rounded-lg p-4 font-serif">
          <div className="p-4">
            <div className="flex justify-center">
              <h2 className="text-xl font-semibold mb-2 font-sans text-blue-900 border-b-2 border-gray-600 w-full">
                Test Instructions
              </h2>
            </div>
            <ul className="ml-5 text-gray-700">
              <li>
                <strong>General Instructions:</strong>
                <ul className="ml-4">
                  <li>Read each question carefully before answering.</li>
                  <li>Manage your time effectively.</li>
                  <li>Answer all questions. There is no negative marking.</li>
                </ul>
              </li>
              <li>
                <strong>Navigation:</strong>
                <ul className="ml-4">
                  <li>Use the menu to navigate between questions.</li>
                  <li>
                    Use "Next" and "Previous" buttons to move between questions.
                  </li>
                  <li>Mark questions for review if unsure about the answer.</li>
                </ul>
              </li>
              <li>
                <strong>Question Interaction:</strong>
                <ul className="ml-4">
                  <li>Select an option to answer a question.</li>
                  <li>Change your answer by selecting a different option.</li>
                  <li>
                    Mark questions for review if you want to revisit them later.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Dos:</strong>
                <ul className="ml-4">
                  <li>Ensure a quiet and distraction-free environment.</li>
                  <li>Check your internet connection before starting.</li>
                  <li>Submit your test before the time runs out.</li>
                </ul>
              </li>
              <li>
                <strong>Don’ts:</strong>
                <ul className="ml-4">
                  <li>Do not refresh the page during the test.</li>
                  <li>Do not use external resources during the test.</li>
                  <li>Avoid blind guessing; make educated guesses instead.</li>
                </ul>
              </li>
              <li>
                <strong>Review and Submission:</strong>
                <ul className="ml-4">
                  <li>Review marked questions before submitting.</li>
                  <li>Double-check all answers before final submission.</li>
                  <li>
                    Ensure you see the confirmation message after submitting.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Post-Test:</strong>
                <ul className="ml-4">
                  <li>
                    Test results will be available soon on your Mail after
                    evaluation.
                  </li>
                </ul>
              </li>
              <div className="flex items-center justify-center ">
                <input
                  type="checkbox"
                  id="agreeToInstructions"
                  className="mr-2"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  required
                />
                <label
                  className="flex items-center cursor-pointer"
                  htmlFor="agreeToInstructions"
                ></label>
                <label
                  className="font-light text-gray-700 cursor-pointer select-none"
                  htmlFor="agreeToInstructions"
                >
                  <p className="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    I agree with the terms and conditions
                  </p>
                </label>
              </div>
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/5 flex flex-col items-center gap-6">
          <VideoPreview />
          <button
            onClick={handleStartTest}
            disabled={!isChecked}
            className={`px-4 py-2 rounded shadow-lg  ${
              isChecked
                ? "hover:bg-violet-500 text-violet-600 hover:text-white hover:shadow-violet-500 border border-b-2 border-violet-600"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Start Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestDetail;
