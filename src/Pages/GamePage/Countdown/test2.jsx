import React, { useState, useEffect } from "react";

const Countdown = ({ counter }) => {
  // const [counter, setCounter] = useState(10);

  // useEffect(() => {
  //   counter > 0 && (setTimeout(() => setCounter(counter - 1), 1000));
  //   console.log(counter);
  //   if (counter === 0) {
  //     nextQuestion();
  //     setCounter(10)
  //     }
  // }, [counter]);

  return (
    <div>
      <div>Countdown: {counter}</div>
    </div>
  );
};

export default Countdown;
