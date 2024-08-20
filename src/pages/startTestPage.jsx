import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import VideoPreview from "../components/videopreview";
import QuestionComponent from "../components/testpagecomponents/questions";
import QuestionNavigation from "../components/testpagecomponents/questionNavigation";
import Timer from "../components/testpagecomponents/timer";
import QuestionList from "../components/testpagecomponents/questionlist";
import SubmitButton from "../components/testpagecomponents/submit";

const StartTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600 * 1000);
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
          `http://localhost:5000/api/tests/${testId}`,
          config
        );
        setQuestions(response.data.questions);
        setTitle(response.data.title);

        const storedData = JSON.parse(localStorage.getItem("testData"));
        if (storedData && storedData.testId === testId) {
          setTimeLeft(storedData.timeLeft);
        } else {
          setTimeLeft(3600 * 1000);
        }

        const saveDataInterval = setInterval(() => {
          localStorage.setItem(
            "testData",
            JSON.stringify({
              testId,
              timeLeft,
            })
          );
        }, 30000);

        return () => clearInterval(saveDataInterval);
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(intervalId);
          handleSubmitTest();
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

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
useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave? Your progress will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
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
        "http://localhost:5000/api/submission/",
        submissionData,
        config
      );

      navigate("/thankpage");
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex rounded-lg">
      <div className="w-2/3 rounded-lg border-gray-400 shadow-3xl shadow-gray-800">
        <Navbar title={title} />
        <div className="h-screen flex flex-col justify-evenly">
          <QuestionComponent
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            handleAnswerChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
          />
          <QuestionNavigation
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            handleNavigation={handleNavigation}
            handleMarkForReview={handleMarkForReview}
          />
        </div>
      </div>

      <div className="flex flex-col items-center bg-white w-1/3">
        <Timer timeLeft={timeLeft} />
        <VideoPreview />
        <QuestionList
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          markedForReview={markedForReview}
          selectedAnswers={selectedAnswers}
          handleQuestionClick={handleQuestionClick}
        />
        <SubmitButton handleSubmitTest={handleSubmitTest} />
      </div>
    </div>
  );
};

export default StartTest;
