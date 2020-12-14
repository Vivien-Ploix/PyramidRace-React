import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ nextQuestion }) => {
  const Completionist = () => {
    nextQuestion()
    return <p>test</p>
  };

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      nextQuestion()
      return <p> test </p>
    } else {
      // Render a countdown
      return <h1>{seconds}</h1>;
    }
  };

  return <Countdown date={Date.now() + 10000} renderer={renderer} />;
};

export default CountdownTimer;
