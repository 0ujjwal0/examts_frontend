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
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

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
          `http://localhost:5000/api/tests/${testId}`,
          config
        );
        setQuestions(response.data.questions);

        console.log(response.data);

        // Start the timer
        const intervalId = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(intervalId);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup timer on component unmount
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testId]);

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
    // Implement functionality to mark the question for review
  };

  const handleSubmitTest = () => {
    // Implement functionality to submit the test
  };

  const formatTime = (seconds) => {
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
      <div className="flex">
        <div className="w-2/3">
          <Navbar />
          <div className=" bg-slate-400 h-screen  flex flex-col justify-evenly">
            <div className="p-6 mb-5 w-full h-auto bg-white ">
              <h1 className=" text-2xl font-semibold mb-4 text-gray-700">
                Cat Question-{currentQuestionIndex+1}
              </h1>
              <hr className="border border-gray-300 m-3" />
              <div className="mb-4 bg-lue-600">
                <p>{currentQuestion.question}</p>
                <div className="my-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="py-2">
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
            <div className="p-4 flex justify-between mb-4 bg-white">
              <button
                onClick={() => handleNavigation("previous")}
                disabled={currentQuestionIndex === 0}
                className="text-blue-700 border border-blue-500 p-1 hover:bg-blue-700 rounded-md hover:text-white"
              >
                Previous
              </button>
              <button onClick={handleMarkForReview}>Mark for Review</button>
              <button
                onClick={() => handleNavigation("next")}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
              <button onClick={handleSubmitTest}>Submit Test</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-fuchsia-300 w-1/3">
          <div className="p-3">
            <h2>Time Left: {formatTime(timeLeft)}</h2>
          </div>
          <div className="status-indicators mb-4 p-4">
            <h2 className="text-lg font-semibold">Questions</h2>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 ${
                    currentQuestionIndex === index
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  } rounded text-white`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartTest;
