import React from "react";
import { MutatingDots } from "react-loader-spinner";

const LoadingScreen = ({ loadingMessage }) => {
  const defaultLoadingMessage =
    "Patience is a virtue, especially when it comes to ETH 2.0";

  return (
    <>
      <h1 className="sm:text-5xl text-5xl">
        {loadingMessage ?? defaultLoadingMessage}
      </h1>
      <div className="mt-5">
        <MutatingDots
          height="100"
          width="100"
          color="#ff5008"
          secondaryColor="white"
          ariaLabel="loading"
        />
      </div>
    </>
  );
};

export default LoadingScreen;
