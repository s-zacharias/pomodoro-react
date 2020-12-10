import React from 'react';

const Timer = ({ timeRemaining, session }) => {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining - minutes * 60;

  const handleSeconds = () => {
    if (seconds < 10 && seconds > 0) {
      return '0' + seconds;
    } else if (seconds === 0) {
      return '00';
    }
    return seconds;
  };

  return (
    <div className="timer-display">
      <h4>{session}</h4>
      <h1>
        {minutes}:{handleSeconds()}
      </h1>
    </div>
  );
};

export default Timer;
