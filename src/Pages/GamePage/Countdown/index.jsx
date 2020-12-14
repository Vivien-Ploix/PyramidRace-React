import React, { useEffect } from 'react';
 
import { useCountdownTimer } from 'use-countdown-timer';
 
const Countdown = ({ onExpire, resetTick }) => {
  const { countdown, reset, start } = useCountdownTimer({
    timer: 1000 * 10,
    autostart: true,
    onExpire
  });

  useEffect(() => {
    if(resetTick === 0){
      return;
    }
    reset();
    start();
  }, [resetTick])
 
  return (
    
      <div>Countdown : {countdown/1000}</div>
 
  );
};

export default Countdown;
