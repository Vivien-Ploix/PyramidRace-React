import "./style.scss";
import React, { useEffect } from "react";

import { useCountdownTimer } from "use-countdown-timer";

const Countdown = ({ onExpire, resetTick }) => {
  const { countdown, reset, start } = useCountdownTimer({
    timer: 1000 * 10,
    autostart: true,
    onExpire,
  });

  useEffect(() => {
    if (resetTick === 0) {
      return;
    }
    reset();
    start();
  }, [resetTick]);

  return (
    <div className="countdown-container">
      <div
        id="clock-b"
        class="countdown-circles d-flex flex-wrap justify-content-center pt-4 mb-4"
      >
        <span class="h1 font-weight-bold">{countdown / 1000}</span>
      </div>
    </div>
  );
};

export default Countdown;
