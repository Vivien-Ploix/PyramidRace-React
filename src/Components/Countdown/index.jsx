import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = () => {
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <h1>{seconds}</h1>;
    }
  };

  return <Countdown date={Date.now() + 5000} renderer={renderer} />;
};

export default CountdownTimer;
