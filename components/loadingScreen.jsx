import React from "react";
import { MutatingDots } from "react-loader-spinner";

const LoadingScreen = ({ loadingMessage }) => {
  const loadingMessages = [
    "Patience is a virtue, especially when it comes to ETH 2.0",
    "It's not that fast ok ... but at least it does not stop like solana",
  ];
  const randomMessage = Math.floor(Math.random() * 2);

  return (
    <>
      <h1 className="sm:text-5xl text-5xl">
        {loadingMessage ?? loadingMessages[randomMessage]}
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
