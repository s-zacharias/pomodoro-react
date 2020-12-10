import React from 'react';

const Controls = ({ countdown, onCountdownStartStop, onReset }) => {
  return (
    <div className="controls">
      <button className="start" onClick={onCountdownStartStop}>
        {countdown === 'pause' ? 'start' : 'pause'}
      </button>
      <button className="reset" onClick={onReset}>
        reset
      </button>
    </div>
  );
};

export default Controls;
