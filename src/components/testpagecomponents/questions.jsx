const QuestionComponent = ({
  currentQuestion,
  currentQuestionIndex,
  handleAnswerChange,
  selectedAnswers,
}) => (
  <div className="p-6 mb-5 w-full h-auto select-none">
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
                checked={selectedAnswers[currentQuestion._id] === option}
                onChange={() => handleAnswerChange(currentQuestion._id, option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default QuestionComponent;
