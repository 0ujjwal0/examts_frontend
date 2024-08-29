const QuestionNavigation = ({
  currentQuestionIndex,
  questions,
  handleNavigation,
  handleMarkForReview,
}) => (
  <div className="p-4 flex justify-evenly mb-4 ">
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
);

export default QuestionNavigation;
