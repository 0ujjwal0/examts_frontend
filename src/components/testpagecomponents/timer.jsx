const Timer = ({ timeLeft }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full flex flex-col mb-3  bg-blue-200 h-fit  ">
      <h2 className="text-lg  font-semibold p-3 text-blue-900  flex justify-center">
        Time - {formatTime(timeLeft)}
      </h2>
    </div>
  );
};

export default Timer;
