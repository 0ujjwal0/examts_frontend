import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const StartTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600 * 1000); // 1 hour in milliseconds
  const [markedForReview, setMarkedForReview] = useState({});
  const [title, setTitle] = useState("");

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
          `https://localhost:5000/api/tests/${testId}`,
          config
        );
        setQuestions(response.data.questions);
        setTitle(response.data.title);
        // Retrieve stored data
        const storedData = JSON.parse(localStorage.getItem("testData"));
        if (storedData && storedData.testId === testId) {
          setTimeLeft(storedData.timeLeft);
        } else {
          setTimeLeft(3600 * 1000); // Default 1 hour
        }

        // Set up interval to save data
        const saveDataInterval = setInterval(() => {
          localStorage.setItem(
            "testData",
            JSON.stringify({
              testId,
              timeLeft,
            })
          );
        }, 30000); // Save every 30 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(saveDataInterval);
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testId]);

  useEffect(() => {
    // Timer countdown effect
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(intervalId);
          // Handle countdown completion, e.g., submit test
          handleSubmitTest();
          return 0;
        }
        return prevTimeLeft - 1000; // Decrease timeLeft by 1 second
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAnswerChange = (questionId, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleNavigation = (direction) => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = direction === "next" ? prevIndex + 1 : prevIndex - 1;
      return Math.max(0, Math.min(newIndex, questions.length - 1));
    });
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleMarkForReview = () => {
    setMarkedForReview((prevReview) => ({
      ...prevReview,
      [currentQuestionIndex]: !prevReview[currentQuestionIndex],
    }));
  };

  const handleSubmitTest = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    const selections = Object.entries(selectedAnswers).map(
      ([questionId, option]) => ({
        questionId,
        option,
        savedAt: new Date().toISOString(),
      })
    );

    const submissionData = {
      testId,
      selections,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "https://localhost:5000/api/submission/",
        submissionData,
        config
      );

      navigate("/thankpage");
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="flex rounded-lg">
        <div className="w-2/3 rounded-lg border-gray-400 shadow-3xl shadow-gray-800">
          <Navbar title={title} />
          <div className="h-screen flex flex-col justify-evenly">
            <div className="p-6 mb-5 w-full h-auto bg-white border-2 select-none">
              <h1 className="text-2xl font-semibold mb-4 text-gray-700">
                Question-{currentQuestionIndex + 1}
              </h1>
              <hr className="border border-gray-300 m-3" />
              <div className="mb-4 text-gray-600">
                <p>{currentQuestion.question}</p>
                <div className="my-2">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="py-2 text-gray-600"
                    >
                      <label>
                        <input
                          type="radio"
                          name={`question-${currentQuestion._id}`}
                          value={option}
                          checked={
                            selectedAnswers[currentQuestion._id] === option
                          }
                          onChange={() =>
                            handleAnswerChange(currentQuestion._id, option)
                          }
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-evenly mb-4 bg-white">
              <button
                onClick={() => handleNavigation("previous")}
                disabled={currentQuestionIndex === 0}
                className="text-blue-700 border border-blue-500 p-1 hover:bg-blue-700 rounded-md hover:text-white"
              >
                Previous
              </button>
              <button
                onClick={handleMarkForReview}
                className="text-yellow-700 border border-yellow-500 py-1 px-3 hover:bg-yellow-700 rounded-md hover:text-white"
              >
                Mark for Review
              </button>
              <button
                onClick={() => handleNavigation("next")}
                disabled={currentQuestionIndex === questions.length - 1}
                className="text-blue-700 border border-blue-500 py-1 px-3 hover:bg-blue-700 rounded-md hover:text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white w-1/3">
          <div className="p-3 w-full flex justify-center bg-blue-200 border border-blue-300">
            <h2>Time Left: {formatTime(timeLeft)}</h2>
          </div>
          <div className="w-full h-full mb-4 py-4 flex flex-col justify-around">
            <div className="h-2/3 border border-b-gray-500 border-t-gray-400 rounded-lg flex flex-col">
              <div>
                <h2 className="text-lg w-full p-2 bg-gray-300 text-gray-700 font-semibold flex justify-center">
                  Questions
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 p-4 justify-start">
                {questions.map((_, index) => {
                  const isAnswered = selectedAnswers.hasOwnProperty(
                    questions[index]._id
                  );
                  const isMarkedForReview = markedForReview[index];
                  const buttonColor =
                    currentQuestionIndex === index
                      ? "bg-blue-500"
                      : isMarkedForReview
                      ? "bg-yellow-500"
                      : isAnswered
                      ? "bg-green-500"
                      : "bg-red-500";

                  return (
                    <button
                      key={index}
                      className={`w-12 h-12 ${buttonColor} rounded-tl-2xl text-white flex items-center justify-center`}
                      onClick={() => handleQuestionClick(index)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleSubmitTest}
              className="text-red-700 border border-red-500 py-1 px-3 hover:bg-red-700 rounded-md hover:text-white"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartTest;
