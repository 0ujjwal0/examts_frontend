const Timer = ({ timeLeft }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-3/4 flex flex-col h-1/6 my-1">
      <h2 className="text-lg font-semibold p-2 bg-violet-100 text-blue-900 rounded-md flex justify-center">
        Time Remaining
      </h2>
      <div className="text-xl font-semibold flex justify-center p-4 text-blue-900">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
