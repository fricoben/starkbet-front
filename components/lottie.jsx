import React from "react";
import ReactLottie from "react-lottie";

const Lottie = ({ animationData, width, height }) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ReactLottie
      className="cursor-default"
      options={lottieOptions}
      height={height}
      width={width}
    />
  );
};

export default Lottie;
