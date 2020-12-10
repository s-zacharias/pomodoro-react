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
        <h5>Active</h5>
        <button onClick={onActiveDecrease}>-</button>
        {activeSession}
        <button onClick={onActiveIncrease}>+</button>
      </div>
      <div className="adjust break">
        <h5>Break</h5>
        <button onClick={onBreakDecrease}>-</button>
        {breakSession}
        <button onClick={onBreakIncrease}>+</button>
      </div>
    </div>
  );
};

export default SessionAdjust;
