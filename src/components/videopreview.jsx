import React from "react";
import Webcam from "react-webcam";

const VideoPreview = () => {
  const webcamRef = React.useRef(null);

  return (
    <div className="  w-full flex flex-row justify-around">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="250px"
        videoConstraints={{ facingMode: "user" }}
        className="border border-b-2 border-blue-300 shadow-lg rounded-md"
      />
    </div>
  );
};

export default VideoPreview;
