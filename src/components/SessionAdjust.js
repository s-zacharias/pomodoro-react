import React from 'react';

const SessionAdjust = ({
  activeSession,
  breakSession,
  onActiveIncrease,
  onActiveDecrease,
  onBreakIncrease,
  onBreakDecrease,
}) => {
  return (
    <div className="adjustments">
      <div className="adjust active">
        <h5 className="label-session">active</h5>
        <button className="up-down-session button" onClick={onActiveDecrease}>
          -
        </button>
        {activeSession}
        <button className="up-down-session button" onClick={onActiveIncrease}>
          +
        </button>
      </div>
      <div className="adjust break">
        <h5 className="label-session">break</h5>
        <button className="up-down-session button" onClick={onBreakDecrease}>
          -
        </button>
        {breakSession}
        <button className="up-down-session button" onClick={onBreakIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SessionAdjust;
