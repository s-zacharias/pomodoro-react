import React from 'react';

const Controls = ({ countdown, onCountdownStartStop, onReset }) => {
  return (
    <div className="controls">
      <button className="start control button" onClick={onCountdownStartStop}>
        {countdown === 'pause' ? 'start' : 'pause'}
      </button>
      <button className="reset control button" onClick={onReset}>
        reset
      </button>
    </div>
  );
};

export default Controls;
