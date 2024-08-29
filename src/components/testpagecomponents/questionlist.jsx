const QuestionList = ({
  questions,
  currentQuestionIndex,
  markedForReview,
  selectedAnswers,
  handleQuestionClick,
}) => (
  <div className="h-auto min-h-80 w-full m-1 border border-b-gray-500 border-t-gray-400 rounded-lg flex flex-col">
    <div>
      <h2 className="text-lg w-full p-2 bg-violet-100 text-gray-700 font-semibold flex justify-center">
        Questions
      </h2>
    </div>
    <div className="flex flex-wrap gap-2 p-4 justify-start  text-white">
      {questions.map((_, index) => {
        const isAnswered = selectedAnswers.hasOwnProperty(questions[index]._id);
        const isMarkedForReview = markedForReview[index];
        const buttonColor =
          currentQuestionIndex === index
            ? "bg-blue-500 border border-gray-400"
            : isMarkedForReview
            ? "bg-yellow-500 border border-gray-400"
            : isAnswered
            ? "bg-green-500 border border-gray-400"
            : "bg-red-500 border border-gray-400";

        return (
          <button
            key={index}
            className={`w-12 h-12 ${buttonColor} rounded-tl-xl`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  </div>
);

export default QuestionList;
