import React from "react";
import { RxCross1 } from "react-icons/rx";
import ReactPlayer from "react-player";

const VideoPopUp = ({ videoSrc, setShowPopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2 right-2 text-black bg-white rounded-full  p-3 z-50"
      >
        <RxCross1 size="1.4em" />
      </button>
      <div className="relative w-full h-full mx-6 max-w-screen-2xl  flex justify-center items-center">
        <div className="rounded-lg overflow-hidden">
          <ReactPlayer
            url={videoSrc}
            playing={true}
            controls
            volume={0.2}
            width="100%"
            className="video-class"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPopUp;
